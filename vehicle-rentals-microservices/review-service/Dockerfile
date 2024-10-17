FROM maven AS build 

COPY . .

RUN mvn clean package -DskipTests


FROM openjdk:17-oracle


COPY --from=build ./target/review-service.jar review-service.jar

CMD ["java","-jar","review-service.jar"]
