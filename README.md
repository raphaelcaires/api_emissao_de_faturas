# API de Emissão de Faturas

Teste Técnico – Desenvolvedor Backend

## Instalação

1. Clone o repositório

   ```
   git clone https://github.com/seu-usuario/api_emissao_de_faturas
   ```

2. Entre no diretório do projeto

   ```
   cd api_emissao_de_faturas
   ```

3. Instale as dependências

   ```
   npm install
   ```

4. Configure as variáveis de ambiente

   ```
   cp .env.example .env
   ```

5. Inicie o servidor de desenvolvimento

   ```
   npm run dev
   ```

## Execução com Docker

Existem duas maneiras de executar a aplicação com Docker:

### Usando Docker diretamente

```bash
# Construir a imagem
docker build -t api-emissao-de-faturas .

# Executar o contêiner na porta 3000
docker run -p 3000:3000 api-emissao-de-faturas
```

### Usando Docker Compose

```bash
# Construir e iniciar com docker-compose
docker-compose up --build

# Para parar os contêineres
docker-compose down
```

**Nota**: Certifique-se de que a porta 3000 não está sendo usada por outra aplicação.

## Documentação da API REST

### Introdução

Bem-vindo à documentação da API de Emissão de Faturas. Esta API permite registrar cobranças individuais e gerar faturas agrupadas por parceiro.

### Endpoints

## Métodos

Requisições para a API devem seguir os padrões:
| Método | Descrição | Endpoint|
|---|---|---|
| `POST` | Registra cobranças no sistema. | /charges |
| `GET` | Gera e retorna as faturas agrupadas por parceiro. | /invoices |
| `GET` | Verifica status de saúde da API. | / |

### 1. Registrar Cobranças

**Endpoint:**
POST /charges

**Payload:**

```json
[
  {
    "chargeId": "c001",
    "partnerId": "net-01",
    "amount": 200.0,
    "reference": "2024-01",
    "timestamp": "2024-01-15T10:00:00Z"
  }
]
```

**Parâmetros do Payload:**

- `chargeId` (Obrigatório): Identificador único da cobrança.
- `partnerId` (Obrigatório): Identificador do parceiro.
- `amount` (Obrigatório): Valor da cobrança.
- `reference` (Obrigatório): Referência (geralmente mês/ano).
- `timestamp` (Obrigatório): Data e hora da cobrança.

**Códigos de Resposta:**

- 201 Created: Todas as cobranças foram criadas com sucesso.
- 207 Multi-Status: Algumas cobranças foram processadas com sucesso.
- 400 Bad Request: Nenhuma cobrança foi processada (todas inválidas ou duplicadas).

**Exemplo de Resposta (201):**

```json
{
  "success": true,
  "processed": [
    {
      "chargeId": "c001",
      "status": "added",
      "message": "Cobrança adicionada com sucesso"
    }
  ]
}
```

**Exemplo de Resposta (207):**

```json
{
  "success": true,
  "processed": [
    {
      "chargeId": "c001",
      "status": "added",
      "message": "Cobrança adicionada com sucesso"
    },
    {
      "chargeId": "c002",
      "status": "duplicate",
      "message": "Cobrança já existe no sistema"
    }
  ]
}
```

### 2. Gerar Faturas

**Endpoint:**
GET /invoices

**Descrição:**
Este endpoint agrupa as cobranças por parceiro, calcula o total e retorna uma lista ordenada por valor total decrescente. As cobranças são removidas do sistema após a geração das faturas.

**Códigos de Resposta:**

- 200 OK: Faturas geradas com sucesso.

**Exemplo de Resposta:**

```json
[
  {
    "partnerId": "net-01",
    "total": 500,
    "charges": [
      {
        "chargeId": "c001",
        "partnerId": "net-01",
        "amount": 200.0,
        "reference": "2024-01",
        "timestamp": "2024-01-15T10:00:00Z"
      },
      {
        "chargeId": "c003",
        "partnerId": "net-01",
        "amount": 300.0,
        "reference": "2024-01",
        "timestamp": "2024-01-15T10:00:00Z"
      }
    ]
  },
  {
    "partnerId": "claro-12",
    "total": 150,
    "charges": [
      {
        "chargeId": "c002",
        "partnerId": "claro-12",
        "amount": 150.0,
        "reference": "2024-01",
        "timestamp": "2024-01-15T10:00:00Z"
      }
    ]
  }
]
```

### 3. Verificar Status da API

**Endpoint:**
GET /

**Descrição:**
Endpoint simples para verificar se a API está online.

**Códigos de Resposta:**

- 200 OK: API está funcionando corretamente.

**Exemplo de Resposta:**

```json
{
  "status": "OK"
}
```

## Documentação Swagger

A documentação completa da API está disponível através do Swagger UI em:

```
http://localhost:3000/docs
```

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Fastify
- Jest
- Swagger
- Docker

## Considerações

- A API armazena os dados em memória, sendo reiniciados quando o servidor é reiniciado.
- As faturas são geradas apenas quando solicitadas via endpoint `/invoices`.
- Após a geração das faturas, todas as cobranças são removidas do sistema.
