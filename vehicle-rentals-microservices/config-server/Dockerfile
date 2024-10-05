FROM maven as build 

COPY . .

RUN mvn clean package -Dskiptests

FROM openjdk:17-oracle


COPY --from=build ./target/config-server.jar config-server.jar

CMD ["java","-jar","config-server.jar"]
