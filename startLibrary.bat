@echo off

cd ./demo
start cmd.exe /k "set JAVA_HOME=C:/Program Files/Java/jdk-19& mvnw spring-boot:run & pause & cd ./src/main/java/com/example/demo & javac DemoApplication.java & pause & exit"

cd..
cd front
cd library
npm start



pause
