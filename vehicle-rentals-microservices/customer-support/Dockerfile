FROM maven AS build 

COPY . .

RUN mvn clean package -DskipTests



FROM openjdk:17-oracle


COPY --from=build ./target/customer-support.jar customer-support.jar

CMD ["java","-jar","customer-support.jar"]
