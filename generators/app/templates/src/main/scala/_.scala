package <%= pkgName %>

import org.apache.spark.{SparkConf, SparkContext}

object <%= className %>App {

  def init(): SparkContext = {
    val sparkConf = new SparkConf().setAppName("<%= appName %>")
    if (System.getProperty("SPARK_MASTER") != null)
      sparkConf.setMaster(System.getProperty("SPARK_MASTER"))
    val sc = new SparkContext(sparkConf)
    sc
  }

  def run(): Unit = {
    val sc = init()

    // Write your code here

    sc.stop()
  }

  def main(args: Array[String]) {
    run()
  }

}
