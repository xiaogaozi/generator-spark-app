package <%= pkgName %>

import org.scalatest.BeforeAndAfter
import org.scalatest.FunSuite

class <%= className %>AppSuite extends FunSuite with BeforeAndAfter {

  before {
    System.setProperty("SPARK_MASTER", "local")
  }

  test("run") {
    <%= className %>App.run()
  }

}
