FROM maven as build 
WORKDIR /app
COPY . .
RUN mvn install 

FROM openjdk:11.0.10-jre
WORKDIR /app
COPY --from=build /app/target/offers-0.0.1-SNAPSHOT.jar /app
EXPOSE 1001
CMD ["java","-jar","offers-0.0.1-SNAPSHOT.jar"]