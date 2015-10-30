name := "<%= jarName %>"

organization := "<%= orgName %>"

version := "0.0.1"

scalaVersion := "<%= scalaVersion %>"

scalacOptions ++= Seq("-deprecation", "-feature")

libraryDependencies ++= Seq(
  "org.apache.spark" %% "spark-core" % "<%= sparkVersion %>" % "provided",
  "org.scalacheck" %% "scalacheck" % "1.12.4" % "test",
  "org.scalatest" %% "scalatest" % "2.2.4" % "test"
)

initialCommands := "import <%= pkgName %>._"

// Skip test during assembly
test in assembly := {}

// Set the uber JAR name
assemblyJarName in assembly := s"${name.value}-assembly.jar"

// Excluding Scala library JARs
assemblyOption in assembly := (assemblyOption in assembly).value.copy(includeScala = false)
