package story

import org.scalatest._
import TestData._
import scala.io.Source
import play.api.libs.json.Json

class ScriberSpec extends FlatSpec with Matchers {
    val storyJSON = Source.fromResource("story.json").getLines.mkString
    val json = Json.parse(storyJSON)

  "parse" should "parse title" in {
    Scriber.parse(json).title shouldEqual story.title
  }

   "parse" should "parse first node" in {
    Scriber.parse(json).startNode.statement shouldEqual story.startNode.statement
  }


}
 