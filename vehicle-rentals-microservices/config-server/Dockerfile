FROM maven AS build 

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:17-oracle


COPY --from=build ./target/config-server.jar config-server.jar

CMD ["java","-jar","config-server.jar"]
