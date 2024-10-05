FROM maven as build 

COPY . .

RUN mvn clean package -Dskiptests

FROM openjdk:17-oracle


COPY --from=build ./target/bookings-service.jar bookings-service.jar

CMD ["java","-jar","bookings-service.jar"]
