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

  "parse" should "parse first node statement" in {
    Scriber.parse(json).startNode.statement shouldEqual story.startNode.statement
  }

  "parse" should "parse first node stuffToDo item" in {
    Scriber.parse(json).startNode.stuffToDo.head.item shouldEqual story.startNode.stuffToDo.head.item
  }

  "parse" should "parse first node stuffToDo touch" in {
    Scriber.parse(json).startNode.stuffToDo.head.touch shouldEqual story.startNode.stuffToDo.head.touch
  }

  "parse" should "parse first node stuffToDo smell" in {
    Scriber.parse(json).startNode.stuffToDo.head.smell shouldEqual story.startNode.stuffToDo.head.smell
  }

  "parse" should "parse second node stuffToDo touch" in {
    Scriber.parse(json).startNode.stuffToDo(1).touch shouldEqual story.startNode.stuffToDo(1).touch
  }

  "parse" should "parse second node stuffToDo taste" in {
    Scriber.parse(json).startNode.stuffToDo(1).taste shouldEqual story.startNode.stuffToDo(1).taste
  }

  "parse" should "parse all" in {
    Scriber.parse(json) shouldEqual story
  }

}
