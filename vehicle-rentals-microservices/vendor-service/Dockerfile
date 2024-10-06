# FROM maven as build 

# COPY . .

# RUN mvn clean package -DskipTests



FROM openjdk:17-oracle


COPY ./target/vendor-service.jar vendor-service.jar

CMD ["java","-jar","vendor-service.jar"]
