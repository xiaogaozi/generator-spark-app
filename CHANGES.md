# Changelog


## Version 0.0.3

- Update Scala and Spark default version to 2.10.6 and 1.5.1
- `bin/run`: delete `$DEFAULT_SPARK_SUBMIT_OPTIONS` (`spark.driver.userClassPathFirst` may
  cause `java.lang.NoClassDefFoundError: org/apache/hadoop/util/VersionInfo` exception)


## Version 0.0.2

- `bin/run`: check `assembly_uber_jar()` return value


## Version 0.0.1

- First version
