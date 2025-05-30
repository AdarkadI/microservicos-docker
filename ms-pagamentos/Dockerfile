# Usando imagem oficial do Maven com JDK 17
FROM maven:3.9.3-eclipse-temurin-17-alpine AS build

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY . .

# Compila e empacota o projeto (sem executar testes)
RUN mvn clean package -DskipTests

# Segunda etapa: roda a aplicação
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copia o jar gerado na etapa de build
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8884

CMD ["java", "-jar", "app.jar"]
