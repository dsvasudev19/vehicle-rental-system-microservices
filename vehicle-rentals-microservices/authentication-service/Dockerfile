FROM maven as build 

COPY . .

RUN mvn clean package -Dskiptests

FROM openjdk:17-oracle


COPY --from=build ./target/authentication-service.jar authentication-service.jar

CMD ["java","-jar","authentication-service.jar"]
