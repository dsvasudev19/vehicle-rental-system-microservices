# FROM maven as build 

# COPY . .

# RUN mvn clean package -DskipTests

FROM openjdk:17-oracle


COPY ./target/authentication-service.jar authentication-service.jar

CMD ["java","-jar","authentication-service.jar"]
