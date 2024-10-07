FROM maven AS build 

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:17-oracle


COPY ./target/config-server.jar config-server.jar

CMD ["java","-jar","config-server.jar"]
