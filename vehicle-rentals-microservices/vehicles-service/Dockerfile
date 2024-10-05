FROM maven as build 

COPY . .

RUN mvn clean package -Dskiptests

FROM openjdk:17-oracle



COPY --from=build ./target/vehicles-service.jar vehicles-service.jar

CMD ["java","-jar","vehicles-service.jar"]
