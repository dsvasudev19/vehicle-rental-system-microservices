FROM maven as build 

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:17-oracle


COPY --from=build ./target/service-registry.jar service-registry.jar

CMD ["java","-jar","service-registry.jar"]
