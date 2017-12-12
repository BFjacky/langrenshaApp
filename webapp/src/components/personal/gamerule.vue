<template>
  <div class="gamerule">
      <div class="title">游戏规则</div>
      <div class="content">
        <div class="item" v-for="value in usefulValue1" v-bind:key="value.id">
          <div class="title_ci">{{value.title}}</div>
          <div class="text_ci">{{value.content}}</div>
        </div>
      </div>
      <div class="title">角色介绍</div>
      <div class="content">
        <div class="item" v-for="value in usefulValue2" v-bind:key="value.id">
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
        "狼人：每天晚上可以杀害一个活着的玩家",
        "白狼：狼人村庄拓展角色，白狼是一头有思想的狼，他痛恨着村民，但也讨厌那些愚蠢的狼们。每晚白狼和其他狼人一起行动，并且白狼每两晚可以单独醒来杀害一人。白狼的胜利条件是全场只剩下白狼。",
        "村民：没有特殊技能。白天可以通过分析和推理帮助好人投杀狼人。",
        "女巫：女巫有两瓶药水。一瓶是灵药，可以救活晚上被杀死的玩家;另一瓶是毒药，可以在晚上毒死一位玩家。女巫一个晚上不能同时使用两瓶药。",
        "猎人：当猎人死亡后，可以枪毙一位活着的玩家(俗称“带走”)。但死于女巫毒药时，不能开枪。",
        "白痴：白痴在白天被投票出局可以发动技能免除出局，仍视为存活。白痴依然按照正常轮次发言，但不再拥有投票权。狼人要将白痴弄出局必须要在夜里将其刀死",
        "守卫：每晚可以守护一个人，但不能连续2晚保护同一个人，此人若是受到投票出局或情侣殉情或女巫毒药的伤害，则守护无效。",
        "盗贼：第一天晚上可以对桌上两张多余的牌进行交换身份，但若是两张牌都是狼人，则必须交换身份。可以不进行交换身份，但第二晚将不能交换身份，仅第一晚",
        "村长：有2条命，狼人第一次杀他不会死，要杀2次才会死，但村长若是因为投票出局、女巫毒药、猎人枪毙和情侣殉情等，只有一条命，村长死了之后所有高级村民的能力失效，成为了普通村民。",
        "乌鸦：狼人村庄拓展角色，诽谤者最喜欢在村中造谣，每天晚上他都会在村中贴满诽谤一个玩家的海报。那个被诽谤的人会在投票时多出原本没有的两票来。乌鸦不能连续两个晚上诽谤同一个人。",
        "狐狸：狐狸拥有敏锐的嗅觉和狡猾的身手。每晚狐狸会醒来，选择三个并排坐的人，主持人会告诉狐狸其中是否有狼人。若没有，则狐狸放松了警惕而永久失去它的能力。",
        "骑士：骑士深知圣光之道，以圣洁的心灵而闻名，不接受任何污蔑和诋毁。骑士可以在白天投票前翻开自己的身份牌并指定一个玩家，若是狼人，则此玩家立刻死亡，然后直接进入黑夜，若不是，则骑士以死谢罪，投票继续。这个技能只能发动一次。",
        "预言家：每晚可以查验一个活着的玩家身份，知道TA是狼人或好人。",
        "野孩子：野孩子从小被狼养大，在被好心的村里人收养后野性也渐渐平息。第一天晚上，野孩子醒来并选择一个榜样，之后的游戏中当榜样以任何形式死亡时，野孩子因为榜样的死亡而丧失人性，成为一个狼人。从这时开始野孩子成为狼人阵营，每天晚上和狼人一起行动，胜利目标也和狼人相同。",
        "大野狼：大野狼是一头格外凶猛的狼人，每天晚上他和狼人一起行动，在狼人杀完人后，大野狼可以单独醒来杀害一人。当有狼人死亡后，大野狼接受了教训，不能再单独行动了。",
        "替罪羊：替罪羊是个可怜的角色。每当投票出现2人或更多人出现平票时，替罪羊必须替这几个人死去，但是替罪羊可以选择谁明天可以投票，谁不能投票。",
        "小女孩：小女孩仅使用于面杀。小女孩可以在狼人杀人时偷看（眯着眼偷看，而不能完全张开眼睛），若狼人发现小女孩，小女孩将代替原本的人死，立马死亡，当晚立刻翻牌，女巫的救药和守卫的守护将不能对小女孩起任何作用。",
        "丘比特：丘比特可以把两个人设为情侣（可以将自己设为情侣之一），这两人若是其中一人死去，另一个也要跟着殉情。若两人中倘若有一人为狼人，那么这两个人的游戏目标将改变成——杀光村子里的所有人。丘比特仅只第一晚可以定情侣",
        "锈剑骑士：三扩拓展角色，老骑士将他的剑视如战友随身携带着。当锈剑骑士被狼人杀害的回合，锈剑骑士左边的第一个狼人因为锈剑导致伤口感染，只能苟且偷生一天，当锈剑骑士宣布死亡的下一个早晨，该狼人因伤口感染而病逝。"
      ],
      usefulValue1: [
        {
          title: "介绍",
          content:
            "狼人游戏是一款桌上游戏。一般要求游戏人数：8-18人，游戏时间：20-30分钟。游戏中主要由狼人、特殊村民和普通村民组成，狼人的目标是吞食所有村民，而村民的目标则是找出隐藏在村民中的狼人并消灭他们，特殊村民由于有特殊功能为游戏提供了很多有力线索，当然也可能是狼人混迹其中混淆你的判断哦，需要你机智敏锐的洞察力，来完成你的任务。"
        },
        {
          title: "玩法",
          content:
            "“狼人”这款桌游的故事发生在一个经常有狼人出没的小镇。每个玩家会被安排一些神秘的角色，比如说是狼人、村民或是一些特别的角色，像长老、猎人、女巫、小女孩、预言家等等。游戏中还有一个人负责控制整个游戏的流程。游戏的时间进程以白天和黑夜的更替为代表。夜里，狼人秘密地选择一个村民杀死。白天到来的时候，被杀的村民就会被淘汰出游戏。剩下的村民，包括不同的村民和那些有特殊身份的村民，商讨并投票，说出他们怀疑谁是狼人。当然他们是根据一些线索和特殊的人物进行判断的。被投票选出的这个玩家就“以私刑被处死”，他将显露他的身份，然后被淘汰出局。"
        }
      ],
      usefulValue2: []
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
    this.usefulValue2 = usefulValue;
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
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 15px;
}
.item {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.title_ci {
  width: 15px;
  background-color: #fc6464;
  font-weight: 700;
  color: white;
  text-align: center;
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
