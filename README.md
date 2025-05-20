# 📱 SafeYard

**SafeYard** é um aplicativo desenvolvido para a empresa **Mottu**, com o objetivo de modernizar e otimizar a gestão de pátios de motos. Através de uma interface intuitiva, o app permite que administradores controlem de forma eficiente as alugações e devoluções de motos, enquanto clientes podem visualizar a disponibilidade de pátios em tempo real e realizar devoluções de forma prática.

A solução foi projetada para garantir maior controle operacional, redução de erros manuais e uma experiência facilitada para o usuário.

---

## 👨‍💻 **Integrantes do Projeto**
- Pedro Henrique Martins dos Reis (RM555306)  
- Adonay Rodrigues da Rocha (RM558782)  
- Thamires Ribeiro Cruz (RM558128)  

---

## 🚀 **Como Executar o Projeto**

1. Clone o repositório:
```bash
git clone https://github.com/pxxmdr/SafeYardMobile
cd SafeYard
code .
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

> O Expo abrirá automaticamente. Você pode rodar no emulador ou escanear o QR Code com o app **Expo Go** no seu celular.

---

## 📚 **Tecnologias Utilizadas**
- React Native com Expo  
- React Navigation  
- TypeScript  
- AsyncStorage (Armazenamento local)  
- Estilização com StyleSheet  

---

## 📱 **Funcionalidades**
- ✅ Navegação entre telas utilizando React Navigation.  
- ✅ Formulários com validação, máscaras e controle de estado via `useState`.  
- ✅ Armazenamento local com AsyncStorage (Histórico de alugações).  
- ✅ Controle de acesso (Admin e Cliente).  
- ✅ Tela de visualização de pátios e devolução de motos.  
- ✅ Tela de perfil do cliente.  

---

## 🔐 **Acessos de Teste (Provisórios)**

Para fins de demonstração, o aplicativo conta com dois tipos de acesso:

- 👨‍💼 **Administrador da Mottu**  
  - **Usuário:** `admin`  
  - **Senha:** `123`  
  - *Permite acesso às telas exclusivas de cadastro de motos e gerenciamento de alugações.*

- 👤 **Cliente Mottu**  
  - **Usuário:** `cliente`  
  - **Senha:** `123`  
  - *Permite visualizar a disponibilidade de pátios e realizar a devolução de motos.*

> ⚠️ *Estes acessos são provisórios e foram criados apenas para fins de demonstração da aplicação.*

---

## 📸 **Fluxo de Telas**

1. **Tela de Login**  
   - Entrada do usuário com acesso provisório:  
     - 👨‍💼 *Admin*: `admin` / `123` → Acesso à área administrativa.  
     - 👤 *Cliente*: `cliente` / `123` → Acesso à área do cliente.

2. **Tela de Cadastro**  
   - Caso o usuário não tenha uma conta, pode realizar um cadastro. (Apenas visual por enquanto)

3. **Fluxo de Acesso:**

   - 👨‍💼 **Administrador (admin):**  
     - Acessa as telas de:  
       - Cadastro de Alugações  
       - Gerenciamento de Alugações  

   - 👤 **Cliente (cliente):**  
     - Acessa as telas de:  
       - Visualizar Pátios e selecionar o Pátio desejado
       - Devolução de Motos  
       - Meu Perfil  

