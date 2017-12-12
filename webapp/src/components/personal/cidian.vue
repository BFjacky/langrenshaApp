<template>
  <div class="gamerule">
      <div class="title">常用词</div>
      <div class="content">
        <div class="item" v-for="value in usefulValue" v-bind:key="value.id">
          <div class="title_ci">{{value.title}}</div>
          <div class="text_ci">{{value.content}}</div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      commonWord: [
        "上警：指第一天白天举手参与竞选警长竞争警徽的行为",
        "警上：指参与了警长竞选的玩家",
        "警下：指没有参加竞选警长的玩家",
        "退水：竞选警长的玩家在警上发言完毕之后决定退出竞选的行为称之为退水",
        "金水：预言家验的好人玩家被称为“金水”",
        "查杀：预言家验的狼人玩家称为查杀",
        "反水：一般指预言家给你金水但是你不认这个预言家，不接金水而且反对他的行为，称为“反水”",
        "银水：女巫夜晚用解药救过的人称为银水(好人身份的佐证，力度低于金水)",
        "对跳：有两个或者两个以上的玩家跳同一个身份牌，则称之为对跳",
        "悍跳：指狼人比较强悍的冒认某种身份牌，比如狼人认预言家则称为，悍跳预言家",
        "场外：指与游戏无关的一些因素，如夜晚的动静等",
        "自爆：承认自己是狼，然后让法官终止发言立即进入夜晚，并且有指刀权利",
        "屠城：狼人或者好人某一边全部出局，游戏结束",
        "屠边：狼人、村民、神民某一边全部出局，游戏结束",
        "首刀：第一夜里狼人的刀法",
        "首验：第一夜里预言家的验人",
        "骗药：使用方法套路让女巫用错解药的行为(一般为狼人自刀，骗取女巫解药)",
        "票型：投票的情况",
        "票死：指白天公投环节吃到最多票的玩家被放逐出局",
        "分票：指好人势力没有统一举票同一名玩家，而分投多名玩家",
        "归票：具有归票权的玩家号召一起举票同一名玩家的行为(警长具有归票权)",
        "抗推：多指好人在白天被公投出局，相当于为狼人扛了白天的一推",
        "划水：不怎么发言或者发言没有信息没有意义",
        "聊爆：指玩家在发言中，不经意的暴露自己的狼人身份",
        "贴脸：指通过非逻辑的方式使自己在游戏过程中获益的发言，如“我发誓XXX”，“我是SS我XXX”等这类发言影响游戏平衡，对其他玩家不公平(一般禁止贴脸)",
        "带走：有身份的牌发动技能使其他玩家出局，如女巫毒药，白狼王自爆，猎人开枪等",
        "开枪：(猎人也称枪牌)指猎人死的时候发动技能开枪带走一名玩家",
        "颜杀：未发言或者发言没有信息点的情况下，通过表情反应直接判断玩家身份",
        "愚民：看不清局势，乱投票的村民",
        "暴民：通过发言或者某些行为来搅乱局势的村民",
        "P K 台：在投票环节出现两个平票玩家，则该二位玩家进行多一轮发言，其余玩家进行投票，并只能在其中选择，此二位玩家行为称之为PK",
        "警徽流：即警徽的流向，指预言家为了防止夜间被杀或者第二天狼自爆无法发言，提前说明晚上的验人顺序，标准局警徽流一般留两夜",
        "撕警徽：通过投票将警长放逐出局的行为",
        "吞警徽：在警上竞选警长发言阶段有狼自爆，则本局游戏没有警徽",
        "前置位：相对而言，同一轮里比较早发言的玩家",
        "后置位：相对而言，同一轮里比较晚发言的玩家",
        "归票位：同一轮里最后一位发言的玩家",
        "平安夜：当天夜里无人死亡",
        "穿衣服：身份，比如一个民跳女巫的身份，则称穿女巫的衣服",
        "脱衣服：不认神的身份",
        "首刀保护：第一局游戏被首刀的玩家，第二局游戏不能被再次首刀",
        "同守同救：狼人刀中守卫守护的玩家，同时女巫使用解药救该名玩家",
      ],
      usefulValue: []
    };
  },
  created: function() {
    let values = this.commonWord;
    let usefulValue = [];
    for (let i = 0; i < values.length; i++) {
      values[i] = values[i].split("：");
    }
    for (let i = 0; i < values.length; i++) {
      usefulValue[i] = {};
      usefulValue[i].title = values[i][0];
      usefulValue[i].content = values[i][1];
    }
    this.usefulValue = usefulValue;
  }
};
</script>
<style scoped>
.gamerule {
  position: absolute;
  width: 100vw;
  /*background-image: url(../../assets/paper2.png);*/
  background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  background-color: #e1c474;
  width: 20vw;
  border-radius: 30%;
  text-align: center;
  margin-top: 3vh;
  margin-bottom: 10px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #f98b0d;
}
.content {
  padding-left: 10vw;
  padding-right: 10vw;
  display: flex;
  margin-bottom: 15px;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.item {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.title_ci {
  background-color: #fc6464;
  font-weight: 700;
  color: white;
  text-align: center;
  width: 15px;
  padding-left: 5px;
  padding-right: 5px;
  letter-spacing: 3px;
  padding-top: 2px;
  padding-bottom: 2px;
}
.text_ci {
  color: #575252;
  font-size: 13px;
  letter-spacing: 2px;
  margin-left: 10px;
}
</style>
