# FROM maven as build 

# COPY . .

# RUN mvn clean package -DskipTests

FROM openjdk:17-oracle


COPY ./target/mail-service.jar mail-service.jar

CMD ["java","-jar","mail-service.jar"]
