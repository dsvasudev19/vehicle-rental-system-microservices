FROM maven as build 

COPY . .

RUN mvn clean package -Dskiptests

FROM openjdk:17-oracle



COPY --from=build ./target/user-service.jar user-service.jar

CMD ["java","-jar","user-service.jar"]
