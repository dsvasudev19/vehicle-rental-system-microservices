FROM maven as build

COPY . .

RUN mvn clean package -Dskiptests

FROM openjdk:17-oracle 


COPY --from=build ./target/vendor-service.jar vendor-service.jar

ENTRYPOINT ["java","-jar","vendor-service.jar"]
