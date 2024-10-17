FROM maven AS build 

COPY . .

RUN mvn clean package -DskipTests



FROM openjdk:17-oracle


COPY --from=build ./target/bookings-service.jar bookings-service.jar

CMD ["java","-jar","bookings-service.jar"]
