
import { DayMission, IntelData } from './types';

export const MISSION_START_DATE = '2026-01-08T00:00:00';

export const INTEL_RECORDS: IntelData[] = [
  { label: "航班號碼 (Flight)", value: "IT254", fieldId: "vjw-flight" },
  { label: "郵遞區號 (Zip Code)", value: "024-0061", fieldId: "vjw-zip" },
  { 
    label: "住宿飯店 (Hotel Name)", 
    value: "Hotel Mets Kitakami", 
    subValue: "岩手県北上市大通り１丁目１－３４",
    fieldId: "vjw-hotel" 
  },
  { label: "聯絡電話 (Phone)", value: "81197612222", fieldId: "vjw-phone" }
];

export const MISSIONS: DayMission[] = [
  {
    id: 'd1',
    title: '階段一：滲透與補給',
    date: '2026/01/08 (Wed)',
    tasks: [
      { 
        id: "d1-1", 
        time: "18:45", 
        label: "抵達仙台機場 (SDJ)", 
        detail: "領取行李與出關，預留 1 小時。",
        note: "檢查所有雪具袋是否確實抵達，IT254 航班若延誤，後續新幹線需即時調整。",
        iconType: 'plane'
      },
      { 
        id: "d1-2", 
        time: "19:45", 
        label: "搭乘仙台機場 Access 線", 
        link: "https://www.senat.co.jp/timetable",
        detail: "目的地：仙台車站 (車程約 25 分鐘)",
        warning: "6 個人加雪包在電車上很占空間，儘量往車廂兩端移動。",
        iconType: 'train'
      },
      { 
        id: "d1-3", 
        time: "21:14", 
        label: "東北新幹線 (Yamabiko 71)", 
        link: "https://transit.yahoo.co.jp/",
        detail: "仙台 -> 北上 (22:03 抵達)",
        note: "Hotel Mets Kitakami 就在站旁，22:15 即可完成入住。",
        iconType: 'train'
      },
      { 
        id: "d1-4", 
        time: "22:30", 
        label: "深夜補給：AEON Town 北上", 
        link: "https://www.aeontown.co.jp/kitakami/",
        detail: "MaxValu 超市 24 小時營業",
        note: "飯店放下行李後立刻前往。這是你們這幾天唯一的超市機會。",
        iconType: 'cart'
      }
    ]
  },
  {
    id: 'd2',
    title: '階段二：首日攻頂',
    date: '2026/01/09 (Thu)',
    tasks: [
      { 
        id: "d2-1", 
        time: "06:40", 
        label: "搭乘第一班接駁巴士", 
        link: "https://www.getokogen.com/winter/access/bus.html",
        detail: "地點：北上站東口站牌",
        warning: "06:25 全員集結完畢。從飯店走到東口只需 3 分鐘。",
        iconType: 'mountain'
      },
      { 
        id: "d2-2", 
        time: "08:00", 
        label: "最佳著裝時間", 
        detail: "於 Center House 租借區完成換裝",
        note: "雪場飯店入住前，先把大行李交給櫃檯，換好衣服直接上纜車。",
        iconType: 'mountain'
      },
      { 
        id: "d2-3", 
        time: "15:00", 
        label: "飯店入住 (Check-in)", 
        detail: "夏油高原雪場飯店",
        note: "下午三點後體力下滑，回飯店辦理入住並小憩。",
        iconType: 'mountain'
      }
    ]
  },
  {
    id: 'd6',
    title: '階段三：撤離計畫',
    date: '2026/01/13 (Tue)',
    tasks: [
      { 
        id: "d6-1", 
        time: "07:30", 
        label: "全員 Check-out", 
        detail: "放棄晨間滑雪，以準時撤離為最高原則。",
        note: "最後檢查房間是否有遺落的充電線或護目鏡。",
        iconType: 'mountain'
      },
      { 
        id: "d6-2", 
        time: "09:00", 
        label: "接駁巴士撤離", 
        link: "https://www.getokogen.com/winter/access/bus.html",
        detail: "目的地：北上車站",
        warning: "這是最穩定的回程起點，不要嘗試搭更晚的班次。",
        iconType: 'train'
      },
      { 
        id: "d6-3", 
        time: "10:14", 
        label: "東北新幹線回程", 
        detail: "北上 -> 仙台 (11:05 抵達)",
        note: "抵達仙台後，利用車站 2F 的「行李寄放處」處理 6 人的重裝。",
        iconType: 'train'
      },
      { 
        id: "d6-4", 
        time: "17:08", 
        label: "最後衝刺：仙台機場線", 
        link: "https://www.senat.co.jp/timetable",
        detail: "確保 17:33 抵達機場，對應 IT254 班機的回程。",
        warning: "週二傍晚是通勤高峰，17:08 是最晚的安全紅線。",
        iconType: 'plane'
      }
    ]
  }
];
