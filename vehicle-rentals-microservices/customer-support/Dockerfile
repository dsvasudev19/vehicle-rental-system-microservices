FROM maven as build 

COPY . .

RUN mvn clean package -Dskiptests

FROM openjdk:17-oracle


COPY --from=build ./target/customer-support.jar customer-support.jar

CMD ["java","-jar","customer-support.jar"]
