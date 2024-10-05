FROM maven as build 

COPY . .

RUN mvn clean package -Dskiptests

FROM openjdk:17-oracle


COPY --from=build ./target/api-gateway.jar api-gateway.jar

CMD ["java","-jar","api-gateway.jar"]
