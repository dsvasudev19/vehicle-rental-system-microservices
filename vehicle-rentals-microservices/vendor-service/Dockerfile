FROM maven AS build 
COPY . .
RUN mvn clean package -DskipTests


FROM openjdk:17-oracle


COPY --from=build ./target/vendor-service.jar vendor-service.jar

CMD ["java","-jar","vendor-service.jar"]
