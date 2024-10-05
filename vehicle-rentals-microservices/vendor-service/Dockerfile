FROM maven as build

WORKDIR /app

COPY . /app

RUN mvn clean package -Dskiptests

FROM openjdk:17-oracle 

WORKDIR /app

COPY --from=build ./app/target/vendor-service.jar /app/vendor-service.jar

ENTRYPOINT ["java","-jar","/app/vendor-service.jar"]
