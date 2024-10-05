# FROM maven as build 

# COPY . .

# RUN mvn clean package -DskipTests

FROM openjdk:17-oracle



COPY ./target/vehicles-service.jar vehicles-service.jar

CMD ["java","-jar","vehicles-service.jar"]
