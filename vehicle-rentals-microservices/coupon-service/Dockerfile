FROM maven AS build 

COPY . .

RUN mvn clean package -DskipTests


FROM openjdk:17-oracle


COPY --from=build ./target/coupon-service.jar coupon-service.jar

CMD ["java","-jar","coupon-service.jar"]
