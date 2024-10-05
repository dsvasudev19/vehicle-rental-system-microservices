# FROM maven as build 

# COPY . .

# RUN mvn clean package -DskipTests

FROM openjdk:17-oracle


COPY ./target/api-gateway.jar api-gateway.jar

CMD ["java","-jar","api-gateway.jar"]
