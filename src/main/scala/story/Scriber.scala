package story

import play.api.libs.json._
import play.api.libs.functional.syntax._
import play.api.libs.json.Reads._

case class Node(
    id: String,
    statement: String,
    optionIds: List[String],
    `type`: String
)

case class StoryOption(
    id: String,
    item: String,
    tasteId: Option[String],
    touchId: Option[String],
    smellId: Option[String],
    lookId: Option[String],
    listenId: Option[String]
)

case class StoryWrapper(
    title: String,
    nodes: List[Node],
    options: List[StoryOption]
)

object Scriber {
  def parse(json: JsValue): Story = {
    implicit val nodeReads = Json.reads[Node]
    implicit val optionReads = Json.reads[StoryOption]
    implicit val storyReads = Json.reads[StoryWrapper]

    val story = Json.fromJson[StoryWrapper](json).get

    val startNode = story.nodes.head

    if (startNode.`type` != "Normal") {
      throw new Error("Bad start node")
    }

    Story(story.title, createNormalNode(story, startNode))
  }

  private def findNode(story: StoryWrapper, node: Node): StoryNode = {
    node.`type` match {
      case "Win"    => WinNode(node.statement)
      case "Normal" => createNormalNode(story, node)
      case "Death"  => DeathNode(node.statement)
      case _        => ???
    }
  }

  private def findNodeById(story: StoryWrapper, nodeId: String): Option[StoryNode] =
    story.nodes.find(_.id == nodeId).map(findNode(story, _))

  private def createNormalNode(story: StoryWrapper, node: Node): NormalNode = {
    val stuffToDo = node.optionIds
      .flatMap(optionId => story.options.find(_.id == optionId))
      .map(createNounAndActions(story))
    NormalNode(node.statement, stuffToDo)
  }

  private def createNounAndActions(story: StoryWrapper) =
    (option: StoryOption) =>
      NounAndActions(
        option.item,
        taste = option.tasteId.flatMap(findNodeById(story, _)),
        touch = option.touchId.flatMap(findNodeById(story, _)),
        smell = option.smellId.flatMap(findNodeById(story, _)),
        look = option.lookId.flatMap(findNodeById(story, _)),
        listen = option.listenId.flatMap(findNodeById(story, _))
      )
}
