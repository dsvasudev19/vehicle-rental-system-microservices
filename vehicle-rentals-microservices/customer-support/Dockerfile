# FROM maven as build 

# COPY . .

# RUN mvn clean package -DskipTests

FROM openjdk:17-oracle


COPY ./target/customer-support.jar customer-support.jar

CMD ["java","-jar","customer-support.jar"]
