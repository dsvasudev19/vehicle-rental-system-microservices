FROM maven AS build 

COPY . .

RUN mvn clean package -DskipTests


FROM openjdk:17-oracle


COPY --from=build ./target/payment-service.jar payment-service.jar

CMD ["java","-jar","payment-service.jar"]
