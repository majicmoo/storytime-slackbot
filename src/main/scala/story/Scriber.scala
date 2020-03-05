package story

import play.api.libs.json._
import play.api.libs.functional.syntax._
import play.api.libs.json.Reads._

case class Node(
    id: String,
    statement: String,
    options: List[String],
    `type`: String
)

object Scriber {
    def parse(json: JsValue): Story = {
        val title = (json \ "title").as[String]
        val firstNode = (json \ "nodes" \ 0).as[JsValue]
        
        Story(title, jsonNodeToStoryNode(firstNode))
    } 

    private def jsonNodeToStoryNode(jsonNode: JsValue): NormalNode = {
        implicit val nodeReads = Json.reads[Node]

        val node = Json.fromJson[Node](jsonNode).get
        NormalNode(node.statement, Nil)
    }
}