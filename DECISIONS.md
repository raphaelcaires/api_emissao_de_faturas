# DECISIONS.md

Este documento registra decisões técnicas importantes tomadas durante o desenvolvimento da API de emissão de faturas.

---

## Como garanti a idempotência (chargeId único)?

### Decisão

Para garantir a **idempotência** da operação de criação de cobranças (`POST /charges`), adotamos a seguinte regra:

- Cada `chargeId` deve ser único e é utilizado como **chave primária lógica** no repositório em memória.

### Implementação

- Antes de inserir uma nova cobrança, verificamos se o `chargeId` já existe:

```ts
if (ChargesRepository.exists(chargeId)) {
  // retorna como duplicado
}
```

### Benefício

- Permite múltiplas chamadas seguras da API com o mesmo payload sem criar dados duplicados.
- Garante consistência sem necessidade de banco de dados relacional.

---

## Como agrupei e ordenei os dados de forma eficiente?

### Decisão

Na geração de faturas (`GET /invoices`), agrupamos as cobranças por `partnerId`, somamos os valores e ordenamos do **maior total para o menor**.

### Implementação

- Utilizamos um `Map<string, Invoice>` para agrupar cobranças:

```ts
const invoicesMap = new Map<string, Invoice>()

for (const charge of allCharges) {
  // Se já existir, acumula o total e adiciona a cobrança
  // Caso contrário, cria nova fatura para aquele partnerId
}
```

- Após o agrupamento, transformamos o `Map` em `Array` e aplicamos :

```ts
invoices.sort((a, b) => b.total - a.total)
```

### Benefício

- Eficiência linear no agrupamento (`O(n)`) e ordenação (`O(n log n)`).
- Utilização de estruturas nativas e rápidas do JavaScript.

---

## Qual estrutura de dados utilizou e por quê?

### Map (`Map<string, Charge>` e `Map<string, Invoice>`)

### Motivos:

- Mapeamento chave-valor com complexidade de busca (`O(1)`).
- Ideal para garantir unicidade (`chargeId`) e agrupamentos (`partnerId`).
- Permite fácil conversão para array para uso posterior.

### Em Repositórios:

```ts
const chargesMap: Map<string, Charge> = new Map()
```

### Em Agrupamentos de Faturas:

```ts
const invoicesMap: Map<string, Invoice> = new Map()
```

---

## Remoção de dados após fatura

Após a geração das faturas, **todas as cobranças utilizadas são removidas** da memória:

```ts
ChargesRepository.clearMany(chargeIds)
```

Isso simula a "faturação" real, evitando reprocessamento futuro.

---

## O que faria diferente se isso fosse parte de um sistema real de emissão de faturas/NFs?

Se esta API fosse parte de um sistema real de emissão de faturas/NFs, faria as seguintes melhorias:

### Persistência de Dados

- Implementaria um banco de dados relacional (como PostgreSQL) para armazenamento persistente
- Utilizaria transações para garantir consistência dos dados
- Adicionaria índices para otimizar consultas frequentes

### Segurança

- Implementaria autenticação OAuth2 ou JWT
- Adicionaria autorização baseada em papéis e permissões
- Adicionaria auditoria e logging detalhados para todas as operações

### Escalabilidade

- Projetaria a aplicação para ser stateless, facilitando a escalabilidade horizontal
- Implementaria caching para melhorar performance
- Consideraria o uso de filas com RabbitMQ para processamento assíncrono de cobranças

### Experiência do Desenvolvedor e Operacional

- Adicionaria documentação mais detalhada
- Implementaria mais testes (unitários, integração, carga)
- Implementaria CI/CD para deployment automático

### Funcionalidades Adicionais

- Histórico de cobranças e faturas
- Busca e filtragem avançadas
- Exportação em diferentes formatos (PDF, CSV)