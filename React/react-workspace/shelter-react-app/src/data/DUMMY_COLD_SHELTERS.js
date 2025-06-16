const DUMMY_COLD_SHELTERS = [
  {
    "id": 3,
    "name": "\uc11c\uc6b8\ub18d\ud559\uad50 \uccad\uac01\uc5b8\uc5b4\ud6c8\ub828\uc13c\ud130 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.58413718522873,
    "lng": 126.96884140648686,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \ud544\uc6b4\ub300\ub85c 103, \uad6d\ub9bd\uc11c\uc6b8\ub18d\ud559\uad50 \uccad\uac01\uc5b8\uc5b4\ud6c8\ub828\uc13c\ud130\ub3d9 \uc9c0\ud5581\uce35 (\uc2e0\uad50\ub3d9)"
  },
  {
    "id": 5,
    "name": "\uccad\uc6b4\ud6a8\uc790\ub3d9\uc8fc\ubbfc\uc13c\ud130 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.58404621793672,
    "lng": 126.97061436144106,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc790\ud558\ubb38\ub85c 92, \uccad\uc6b4\ud6a8\uc790\ub3d9\uc8fc\ubbfc\uc13c\ud130 \uc9c0\ud5581\uce35 (\uad81\uc815\ub3d9)"
  },
  {
    "id": 7,
    "name": "\uad6c\uae30\ud130\ub110",
    "type": "COLD",
    "lat": 37.60878995094593,
    "lng": 126.95553788094333,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc9c4\ud765\ub85c 419, \uad6c\uae30\ud130\ub110\uad00\ub9ac\uc0ac\ubb34\uc18c (\uad6c\uae30\ub3d9)"
  },
  {
    "id": 9,
    "name": "\ucc3d\uc2e02\ub3d9\uc8fc\ubbfc\uc13c\ud130 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.57440128293274,
    "lng": 127.01078907130506,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \ucc3d\uc2e0\uae38 62 (\ucc3d\uc2e0\ub3d9, \ucc3d\uc2e0\uc81c2\ub3d9\uc8fc\ubbfc\uc13c\ud130)"
  },
  {
    "id": 16,
    "name": "KT\ud61c\ud654\uc9c0\uc0ac \uc9c0\ud5581\uce35 \uccb4\ub825\ub2e8\ub828\uc2e4",
    "type": "COLD",
    "lat": 37.57712822294289,
    "lng": 127.00197551015674,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \ub300\ud559\ub85c 65 (\uc5f0\uac74\ub3d9, KT\ud61c\ud654\uc9c0\uc0ac)"
  },
  {
    "id": 19,
    "name": "\uc0bc\ud658\ube4c\ub529 \uc9c0\ud5581~2\uce35",
    "type": "COLD",
    "lat": 37.57693620879362,
    "lng": 126.98892182408574,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc728\uace1\ub85c 88 (\uc6b4\ub2c8\ub3d9, \uc0bc\ud658\ube4c\ub529)"
  },
  {
    "id": 23,
    "name": "\uc5f0\ud569\ub274\uc2a4\ube4c\ub529 \uc9c0\ud5582~3\uce35",
    "type": "COLD",
    "lat": 37.57455537245056,
    "lng": 126.98040580939718,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc728\uace1\ub85c2\uae38 25 (\uc218\uc1a1\ub3d9, \uc5f0\ud569\ub274\uc2a4\ube4c\ub529)"
  },
  {
    "id": 26,
    "name": "\ud0dc\ud654\ube4c\ub529 \uc9c0\ud5581~3\uce35",
    "type": "COLD",
    "lat": 37.57213698961912,
    "lng": 126.98476913768104,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc778\uc0ac\ub3d95\uae38 29 (\uc778\uc0ac\ub3d9, \ud0dc\ud654\ube4c\ub529)"
  },
  {
    "id": 32,
    "name": "\uc11d\ud0c4\ud68c\uad00\ube4c\ub529 \uc9c0\ud5582~3\uce35",
    "type": "COLD",
    "lat": 37.572852859484215,
    "lng": 126.98018362331884,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc885\ub85c5\uae38 58 (\uc218\uc1a1\ub3d9, \uc11d\ud0c4\ud68c\uad00\ube4c\ub529)"
  },
  {
    "id": 39,
    "name": "\uc9c0\ud558\ucca01\ud638\uc120 \uc885\ub85c3\uac00\uc5ed \ub300\ud569\uc2e4 \uc2b9\uac15\uc7a5 \uc9c0\ud5581~2\uce35",
    "type": "COLD",
    "lat": 37.57051667376227,
    "lng": 126.99200033168536,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc885\ub85c \uc9c0\ud558 129 (\uc885\ub85c3\uac00, 1\ud638\uc120 \uc885\ub85c3\uac00\uc5ed)"
  },
  {
    "id": 40,
    "name": "\uc11c\uc6b8\ud61c\ud654\uacbd\ucc30\uc11c \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.572345469012575,
    "lng": 126.99865107097564,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \ucc3d\uacbd\uad81\ub85c 112-16 (\uc778\uc758\ub3d9, \uc11c\uc6b8\ud61c\ud654\uacbd\ucc30\uc11c)"
  },
  {
    "id": 52,
    "name": "\uc138\uc885\ubb38\ud654\ud68c\uad00 \uc9c0\ud5582\uce35 \uc138\uc885\u00b7\ucda9\ubb34\uacf5\uc774\uc57c\uae30 \uc804\uc2dc\uad00",
    "type": "COLD",
    "lat": 37.57200988776516,
    "lng": 126.97630706472178,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc138\uc885\ub300\ub85c 175(\uc138\uc885\ub85c)"
  },
  {
    "id": 53,
    "name": "\uc138\uc591\ube4c\ub529 \uc9c0\ud5582\uce35",
    "type": "COLD",
    "lat": 37.574178704464025,
    "lng": 126.97300153899076,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc0ac\uc9c1\ub85c8\uae38 39, \uc138\uc591\ube4c\ub529 \uc9c0\ud5581\uce35 (\ub0b4\uc790\ub3d9)"
  },
  {
    "id": 62,
    "name": "\uc138\uc885\ube4c\ub529 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.57175171224661,
    "lng": 126.97336569134036,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc138\uc885\ub300\ub85c23\uae38 54, \uc138\uc885\ube4c\ub529, \uc138\uc885\uc544\ud30c\ud2b8 \uc9c0\ud5581\uce35 (\ub2f9\uc8fc\ub3d9)"
  },
  {
    "id": 75,
    "name": "\uc11c\uc6b8\uba85\uc2e0\ucd08\ub4f1\ud559\uad50 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.58210445213334,
    "lng": 127.0148189523262,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \ub099\uc0b0\uae38 250 (\ucc3d\uc2e0\ub3d9, \uc11c\uc6b8\uba85\uc2e0\ucd08\ub4f1\ud559\uad50)"
  },
  {
    "id": 87,
    "name": "\uc9c0\ud558\ucca01\ud638\uc120 \uc885\ub85c5\uac00\uc5ed \ub300\ud569\uc2e4 \uc2b9\uac15\uc7a5 \uc9c0\ud5582\uce35",
    "type": "COLD",
    "lat": 37.57082788874661,
    "lng": 127.00162372668711,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc885\ub85c \uc9c0\ud558 216 (\uc885\ub85c5\uac00, 1\ud638\uc120 \uc885\ub85c5\uac00\uc5ed)"
  },
  {
    "id": 88,
    "name": "\ub3d9\ub300\ubb38\uc804\ucca0\uc5ed\uc9c0\ud558\uc0c1\uac00 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.57037804253119,
    "lng": 127.0093889498207,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc728\uace1\ub85c \uc9c0\ud558308, 4\ud638\uc120 \ub3d9\ub300\ubb38\uc5ed (\uc885\ub85c6\uac00)"
  },
  {
    "id": 89,
    "name": "\uc5ec\uc804\ub3c4\ud68c\uad00 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.5757573320574,
    "lng": 126.9997678583528,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc728\uace1\ub85c 190 (\uc5f0\uc9c0\ub3d9, \uc5ec\uc804\ub3c4\ud68c\uad00)"
  },
  {
    "id": 95,
    "name": "\uc9c0\ud558\ucca01\ud638\uc120 \ub3d9\ubb18\uc55e\uc5ed \ub300\ud569\uc2e4 \uc2b9\uac15\uc7a5 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.57367267492826,
    "lng": 127.01737305618684,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc885\ub85c 359, \ub3d9\ubb18\uc55e\uc5ed \uc9c0\ud5581\uce35 (\uc22d\uc778\ub3d9)"
  },
  {
    "id": 101,
    "name": "\uae08\ud638\ud314\ub808\uc2a4\ube4c\ub529 \uc9c0\ud5581~2\uce35",
    "type": "COLD",
    "lat": 37.57260821996063,
    "lng": 127.01537699507948,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc9c0\ubd09\ub85c 29 (\ucc3d\uc2e0\ub3d9, \uae08\ud638\ud314\ub808\uc2a4\ube4c\ub529)"
  },
  {
    "id": 103,
    "name": "\ub450\uc0b0\uc544\ud30c\ud2b8 \uc9c0\ud5581~2\uce35",
    "type": "COLD",
    "lat": 37.57440423595678,
    "lng": 127.01509895527217,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc9c0\ubd09\ub85c5\uae38 7 (\ucc3d\uc2e0\ub3d9, \ub450\uc0b0\uc544\ud30c\ud2b8)"
  },
  {
    "id": 105,
    "name": "\uc9c0\ud558\ucca04\ud638\uc120 \ub3d9\ub300\ubb38\uc5ed \ub300\ud569\uc2e4 \uc9c0\ud5584\uce35 \uc2b9\uac15\uc7a5",
    "type": "COLD",
    "lat": 37.57037804253119,
    "lng": 127.0093889498207,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc728\uace1\ub85c \uc9c0\ud558 308 (\uc885\ub85c6\uac00, 4\ud638\uc120\ub3d9\ub300\ubb38\uc5ed)"
  },
  {
    "id": 106,
    "name": "\ub3d9\uc2e0\uad50\ud68c \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.57077886185567,
    "lng": 127.0126780946532,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc885\ub85c44\uae38 43 (\ucc3d\uc2e0\ub3d9, \ub3d9\uc2e0\uad50\ud68c,\ub3d9\uc2e0\uad50\ud68c\uad50\uc721\uad00)"
  },
  {
    "id": 131,
    "name": "SK\uc5d0\ucf54\ud50c\ub79c\ud2b8 \uc218\uc1a1\uc2a4\ud018\uc5b4 \uc9c0\ud5582~6\uce35",
    "type": "COLD",
    "lat": 37.57470120741301,
    "lng": 126.98089031176087,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \uc728\uace1\ub85c2\uae38 19, \uc218\uc1a1\uc2a4\ud018\uc5b4 (\uc218\uc1a1\ub3d9)"
  },
  {
    "id": 132,
    "name": "\uc0bc\uc131\uc544\ud30c\ud2b8 \uc9c0\ud558\uc8fc\ucc28\uc7a5 1~2\uce35",
    "type": "COLD",
    "lat": 37.61102288666165,
    "lng": 126.97852553178298,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc885\ub85c\uad6c \ud3c9\ucc3d\ubb38\ud654\ub85c 172 (\ud3c9\ucc3d\ub3d9, \uc0bc\uc131\uc544\ud30c\ud2b8)"
  },
  {
    "id": 134,
    "name": "3\ud638\uc120\uc57d\uc218\uc5ed\uc9c0\ud558\ucca0\uc2b9\uac15\uc7a5",
    "type": "COLD",
    "lat": 37.554665497305365,
    "lng": 127.0107423355242,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc911\uad6c \ub2e4\uc0b0\ub85c \uc9c0\ud558122, \uc57d\uc218\uc5ed 3\ud638\uc120 (\uc2e0\ub2f9\ub3d9)"
  },
  {
    "id": 143,
    "name": "\uc120\uc77c\ube4c\ub5293\ud638\uc120\uc57d\uc218\uc5ed\uc9c0\ud558\ucca0\uc2b9\uac15\uc7a5",
    "type": "COLD",
    "lat": 37.55507180053568,
    "lng": 127.01010499694188,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc911\uad6c \ub3d9\ud638\ub85c 191 (\uc2e0\ub2f9\ub3d9, \uc120\uc77c\ube4c\ub529)"
  },
  {
    "id": 160,
    "name": "\ubd80\uc601\ube4c\ub529 \uc9c0\ud5583\uce35",
    "type": "COLD",
    "lat": 37.56160902702944,
    "lng": 126.97364732384332,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc911\uad6c \uc138\uc885\ub300\ub85c9\uae38 42, \ubd80\uc601\ube4c\ub529 (\uc11c\uc18c\ubb38\ub3d9)"
  },
  {
    "id": 164,
    "name": "1\ud638\uc120\uc2dc\uccad\uc5ed\uc9c0\ud558\ucca0\uc2b9\uac15\uc7a5",
    "type": "COLD",
    "lat": 37.565471899527694,
    "lng": 126.97699297993226,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc911\uad6c \uc138\uc885\ub300\ub85c \uc9c0\ud558 101 (\uc815\ub3d9, \uc2dc\uccad\uc5ed 1\ud638\uc120)"
  },
  {
    "id": 174,
    "name": "6\ud638\uc120\uc57d\uc218\uc5ed\uc9c0\ud558\ucca0\uc2b9\uac15\uc7a5",
    "type": "COLD",
    "lat": 37.55412449069521,
    "lng": 127.01025330126228,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc911\uad6c \ub2e4\uc0b0\ub85c \uc9c0\ud558 115 (\uc2e0\ub2f9\ub3d9, \uc57d\uc218\uc5ed 6\ud638\uc120)"
  },
  {
    "id": 175,
    "name": "\uccad\uad6c\uc5ed\uc9c0\ud558\ucca0\uc2b9\uac15\uc7a5",
    "type": "COLD",
    "lat": 37.56022965017423,
    "lng": 127.013759584162,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc911\uad6c \uccad\uad6c\ub85c \uc9c0\ud558 77 (\uc2e0\ub2f9\ub3d9, \uccad\uad6c\uc5ed 5,6\ud638\uc120)"
  },
  {
    "id": 191,
    "name": "\uc911\uad6c\uc885\ud569\ubcf5\uc9c0\uc13c\ud130 \uc9c0\ud5581~2\uce35",
    "type": "COLD",
    "lat": 37.565141438533466,
    "lng": 127.02279519588171,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc911\uad6c \ud1f4\uacc4\ub85c 460, \uc911\uad6c\uc885\ud569\ubcf5\uc9c0\uc13c\ud130 (\uc2e0\ub2f9\ub3d9)"
  },
  {
    "id": 195,
    "name": "\uc2e0\ub2f9\ud604\ub300\uc544\ud30c\ud2b8 \uad00\ub9ac\ub3d9 \uc9c0\ud558 2\uce35",
    "type": "COLD",
    "lat": 37.55976778902146,
    "lng": 127.02010907788956,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc911\uad6c \ub2e4\uc0b0\ub85c36\uae38 109 (\uc2e0\ub2f9\ub3d9, \ud604\ub300\uc544\ud30c\ud2b8)"
  },
  {
    "id": 196,
    "name": "\uc2e0\ub2f9\uc0bc\uc131\uc544\ud30c\ud2b8 \uc9c0\ud558\uc8fc\ucc28\uc7a5",
    "type": "COLD",
    "lat": 37.558404347173926,
    "lng": 127.01670412576412,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc911\uad6c \uccad\uad6c\ub85c1\uae38 23 (\uc2e0\ub2f9\ub3d9, \uc0bc\uc131\uc544\ud30c\ud2b8)"
  },
  {
    "id": 197,
    "name": "\uc57d\uc218\ud558\uc774\uce20\uc544\ud30c\ud2b8 \uc9c0\ud558\uc8fc\ucc28\uc7a5",
    "type": "COLD",
    "lat": 37.5549110413082,
    "lng": 127.0123437662424,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc911\uad6c \ub3d9\ud638\ub85c10\uae38 30 (\uc2e0\ub2f9\ub3d9, \uc57d\uc218\ud558\uc774\uce20)"
  },
  {
    "id": 219,
    "name": "\ub0a8\uc601\ub3d9\uc8fc\ubbfc\uc13c\ud130(\uc9c0\ud5581\uce35)",
    "type": "COLD",
    "lat": 37.54557648453648,
    "lng": 126.97496618068764,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \ub450\ud141\ubc14\uc704\ub85c 25, \ub0a8\uc601\ub3d9 \uc8fc\ubbfc\uc13c\ud130 \uc9c0\ud5581\uce35\uce35 (\uac08\uc6d4\ub3d9)"
  },
  {
    "id": 220,
    "name": "\uc18c\ud654\uc544\ub3d9\ubcd1\uc6d0(\uc9c0\ud5581\uce35)",
    "type": "COLD",
    "lat": 37.55375910254197,
    "lng": 126.96876947275769,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \uccad\ud30c\ub85c 383, \uc885\uadfc\ub2f9\uac74\uac15\ube4c\ub529 \uc9c0\ud558 1\uce35 (\uc11c\uacc4\ub3d9)"
  },
  {
    "id": 221,
    "name": "\uc219\uba85\uc5ec\uc790\ub300\ud559\uad50(\uc9c0\ud5581~2\uce35)",
    "type": "COLD",
    "lat": 37.54531633415772,
    "lng": 126.96488274576105,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \uccad\ud30c\ub85c47\uae38 100, \uc219\uba85\uc5ec\uc790\ub300\ud559\uad50 \uc9c0\ud558 1~3\uce35 (\uccad\ud30c\ub3d92\uac00)"
  },
  {
    "id": 226,
    "name": "\uc2e0\uc6a9\uc0b0\uc5ed(\uc9c0\ud5581~2\uce35)",
    "type": "COLD",
    "lat": 37.529676494981054,
    "lng": 126.96844970581604,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \ud55c\uac15\ub300\ub85c \uc9c0\ud558112, 4\ud638\uc120 \uc2e0\uc6a9\uc0b0\uc5ed \uc9c0\ud5581~2\uce35 (\ud55c\uac15\ub85c2\uac00)"
  },
  {
    "id": 229,
    "name": "\uc774\ucd0c\ub3d9 \ud604\ub300\uc544\ud30c\ud2b8(\uc9c0\ud558 1~1\uce35)",
    "type": "COLD",
    "lat": 37.51809046476939,
    "lng": 126.98044079292804,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \uc774\ucd0c\ub85c 303, \uc9c0\ud558 1~1\uce35 (\uc774\ucd0c\ub3d9, \ud604\ub300\uc544\ud30c\ud2b8)"
  },
  {
    "id": 234,
    "name": "\uc774\ucd0c\ub3d9 \ubd81\ud55c\uac15\uc544\ud30c\ud2b8( \uc9c0\ud5581~2\uce35)",
    "type": "COLD",
    "lat": 37.52703662617509,
    "lng": 126.95401625192729,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \uc774\ucd0c\ub85c2\uac00\uae38 66, \uc9c0\ud5581~2\uce35 (\uc774\ucd0c\ub3d9, \ubd81\ud55c\uac15\uc544\ud30c\ud2b8)"
  },
  {
    "id": 235,
    "name": "\uccad\ud654\uc544\ud30c\ud2b8(\uc9c0\ud5581\uce35)",
    "type": "COLD",
    "lat": 37.52817565759144,
    "lng": 126.9934416815308,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \uc7a5\ubb38\ub85c 27, \uccad\ud654\uc544\ud30c\ud2b8 \uc9c0\ud558\uce35 (\uc774\ud0dc\uc6d0\ub3d9, \uccad\ud654\uc544\ud30c\ud2b8)"
  },
  {
    "id": 236,
    "name": "\ud574\ubc00\ud134\ud638\ud154(\uc9c0\ud5583~4\uce35)",
    "type": "COLD",
    "lat": 37.5346342076442,
    "lng": 126.9938775919064,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \uc774\ud0dc\uc6d0\ub85c 179, \ud574\ubc00\ud1a4\ud638\ud154 (\ubcf8\uad00) \uc9c0\ud558 3~4\uce35 (\uc774\ud0dc\uc6d0\ub3d9)"
  },
  {
    "id": 240,
    "name": "\uc5ec\uc120\uad50\ud68c\uc804\uad6d\uc5f0\ud569\ud68c\uad00(\uc9c0\ud5581~2\uce35)",
    "type": "COLD",
    "lat": 37.535085035750605,
    "lng": 127.0113738400138,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \ub3c5\uc11c\ub2f9\ub85c 98 (\ud55c\ub0a8\ub3d9)"
  },
  {
    "id": 241,
    "name": "\ud558\uc58f\ud2b8\ud638\ud154(\uc9c0\ud5581~2\uce35)",
    "type": "COLD",
    "lat": 37.540429955371415,
    "lng": 126.99686268267716,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \uc18c\uc6d4\ub85c 322, \ud558\uc58f\ud2b8\ud638\ud154 \uc9c0\ud558 1~2\uce35 (\ud55c\ub0a8\ub3d9)"
  },
  {
    "id": 242,
    "name": "\uc81c\uc77c\uae30\ud68d\ube4c\ub529(\uc9c0\ud5583~4\uce35)",
    "type": "COLD",
    "lat": 37.53498280062163,
    "lng": 126.99875732682108,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \uc774\ud0dc\uc6d0\ub85c 222, \uc81c\uc77c\uae30\ud68d (\ud55c\ub0a8\ub3d9)"
  },
  {
    "id": 249,
    "name": "\ube0c\ub77c\uc6b4\uc2a4\ud1a4\ub0a8\uc0b0\uc544\ud30c\ud2b8(\uc9c0\ud5582\uce35)",
    "type": "COLD",
    "lat": 37.55176624409274,
    "lng": 126.97675887240032,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \ud6c4\uc554\ub85c 65 (\ud6c4\uc554\ub3d9, \ube0c\ub77c\uc6b4\uc2a4\ud1a4 \ub0a8\uc0b0\uc544\ud30c\ud2b8)"
  },
  {
    "id": 253,
    "name": "\ud55c\ub0a8\ud790\uc2a4\ud14c\uc774\ud2b8\uc544\ud30c\ud2b8(\uc9c0\ud5581~2\uce35)",
    "type": "COLD",
    "lat": 37.52813016317434,
    "lng": 127.00471907075054,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \uc7a5\ubb38\ub85c 141, \uc9c0\ud558 1~2\uce35 (\ud55c\ub0a8\ub3d9, \ud55c\ub0a8\ud790\uc2a4\ud14c\uc774\ud2b8)"
  },
  {
    "id": 254,
    "name": "\uc11c\ube59\uace0 \uae08\ud638\ubca0\uc2a4\ud2b8\ube4c(\uc9c0\ud5581~2\uce35)",
    "type": "COLD",
    "lat": 37.5233800926688,
    "lng": 126.99176234869024,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \uc11c\ube59\uace0\ub85c51\uae38 68-14 (\uc11c\ube59\uace0\ub3d9, \uae08\ud638\ubca0\uc2a4\ud2b8\ube4c)"
  },
  {
    "id": 265,
    "name": "\uc2dc\ud2f0\ud30c\ud06c1\ub2e8\uc9c0(\uc9c0\ud5581~3\uce35)",
    "type": "COLD",
    "lat": 37.52445556691083,
    "lng": 126.96868292213618,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \uc11c\ube59\uace0\ub85c 35, \uc9c0\ud5581~3\uce35 (\ud55c\uac15\ub85c3\uac00, \uc6a9\uc0b0\uc2dc\ud2f0\ud30c\ud06c1\ub2e8\uc9c0)"
  },
  {
    "id": 274,
    "name": "\uc6a9\uc0b0\ud478\ub974\uc9c0\uc624\ud30c\ud06c\ud0c0\uc6b4(\uc9c0\ud5581~2\uce35)",
    "type": "COLD",
    "lat": 37.52639750283462,
    "lng": 126.99513821996872,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \uc7a5\ubb38\ub85c6\uae38 76 (\ub3d9\ube59\uace0\ub3d9, \uc6a9\uc0b0\ud478\ub974\uc9c0\uc624\ud30c\ud06c\ud0c0\uc6b4)"
  },
  {
    "id": 277,
    "name": "\ud6c4\uc554\ub3d9 \uc8fc\ubbfc\uc13c\ud130(\uc9c0\ud5581\uce35)",
    "type": "COLD",
    "lat": 37.54874516258551,
    "lng": 126.97815971905624,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc6a9\uc0b0\uad6c \ud6c4\uc554\ub85c 32-6 (\ud6c4\uc554\ub3d9, \ud6c4\uc554\ub3d9 \uc8fc\ubbfc\uc13c\ud130)"
  },
  {
    "id": 288,
    "name": "\ub300\ub9bc2\ucc28\uc544\ud30c\ud2b8 (\uad00\ub9ac\uc0ac\ubb34\uc18c, \uc9c0\ud558 1\uce35)",
    "type": "COLD",
    "lat": 37.553905420627935,
    "lng": 127.03344241688644,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \ub3c5\uc11c\ub2f9\ub85c 431 (\uc751\ubd09\ub3d9, \ub300\ub9bc2\ucc28\uc544\ud30c\ud2b8)"
  },
  {
    "id": 306,
    "name": "\uc625\uc218\ud604\ub300\uc544\ud30c\ud2b8\ub2e8\uc9c0 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.54287629591491,
    "lng": 127.01724746472152,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \ub3c5\uc11c\ub2f9\ub85c40\uae38 25 (\uc625\uc218\ub3d9, \uc625\uc218\ud604\ub300\uc544\ud30c\ud2b8)"
  },
  {
    "id": 307,
    "name": "\uc131\ub3d9\uc138\ubb34\uc11c(\uc9c0\ud5581\uce35~ 2\uce35 \uc8fc\ucc28\uc7a5)",
    "type": "COLD",
    "lat": 37.54842299874828,
    "lng": 127.06280531545023,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uad11\ub098\ub8e8\ub85c 297 (\uc1a1\uc815\ub3d9, \uc131\ub3d9\uc138\ubb34\uc11c)"
  },
  {
    "id": 313,
    "name": "\ud55c\uc591\ub300\ud559\uad50 \uc62c\ub9bc\ud53d\uccb4\uc721\uad00 \uc9c0\ud558 1\uce35",
    "type": "COLD",
    "lat": 37.55741250387464,
    "lng": 127.04291313584469,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uc655\uc2ed\ub9ac\ub85c 222 (\uc0ac\uadfc\ub3d9, \ud55c\uc591\ub300\ud559\uad50)"
  },
  {
    "id": 316,
    "name": "\ub300\ub9bc\uac15\ubcc0\ud0c0\uc6b41\uc8fc\ucc28\uc7a5(\uc9c0\ud5581~3\uce35)2\uc8fc\ucc28\uc7a5(\uc9c0\ud5581~2\uce35)",
    "type": "COLD",
    "lat": 37.5544481301858,
    "lng": 127.034691795043,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uace0\uc0b0\uc790\ub85c 160 (\uc751\ubd09\ub3d9, \ub300\ub9bc\uac15\ubcc0\ud0c0\uc6b4)"
  },
  {
    "id": 323,
    "name": "\uc11c\uc6b8\uad50\ud1b5\uacf5\uc0ac \ubcf8\uc0ac \uc9c0\ud558\uc8fc\ucc28\uc7a5 (\uc9c0\ud5581~3\uce35)",
    "type": "COLD",
    "lat": 37.56283403521619,
    "lng": 127.05730133367138,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \ucc9c\ud638\ub300\ub85c 346 (\uc6a9\ub2f5\ub3d9)"
  },
  {
    "id": 325,
    "name": "\uc655\uc2ed\ub9ac\ud48d\ub9bc\uc544\uc774\uc6d0 \uc9c0\ud5581\uce35~5\uce35",
    "type": "COLD",
    "lat": 37.55938423218999,
    "lng": 127.02400566179055,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \ub09c\uacc4\ub85c 84(\ud558\uc655\uc2ed\ub9ac\ub3d9, \uc655\uc2ed\ub9ac\ud48d\ub9bc\uc544\uc774\uc6d0)"
  },
  {
    "id": 327,
    "name": "\uc2e0\ud55c\ub125\uc2a4\ud154 \uc9c0\ud558\uc8fc\ucc28\uc7a5 1~3\uce35",
    "type": "COLD",
    "lat": 37.56371880432287,
    "lng": 127.03596698336,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uace0\uc0b0\uc790\ub85c 269 (\ub3c4\uc120\ub3d9, \uc2e0\ud55c\ub125\uc2a4\ud154)"
  },
  {
    "id": 332,
    "name": "\ud589\ub2f9\ud55c\uc9c4\ud0c0\uc6b4\uc885\ud569\uc0c1\uac00(\uc9c0\ud5584\uce35~\uc9c0\ud5586\uce35)",
    "type": "COLD",
    "lat": 37.55663727934797,
    "lng": 127.02864061493734,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \ud589\ub2f9\ub85c 84, \ud589\ub2f9 \ud55c\uc9c4\ud0c0\uc6b4 \uc885\ud569\uc0c1\uac00\uc9c0\ud558\uc8fc\ucc28\uc7a5\uc9c0\ud5583\uce35 (\ud589\ub2f9\ub3d9)"
  },
  {
    "id": 336,
    "name": "\ud589\ub2f9\ud55c\uc9c4\ud0c0\uc6b4\uc784\ub300\uc544\ud30c\ud2b8(\uc9c0\ud5581\uce35 \uc8fc\ucc28\uc7a5)",
    "type": "COLD",
    "lat": 37.55662679362287,
    "lng": 127.02827729926848,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \ud589\ub2f9\ub85c 82, \uc784\ub300\ub3d9 \uc9c0\ud558\uc8fc\ucc28\uc7a5 \uc9c0\ud5581\uce35 (\ud589\ub2f9\ub3d9, \ud589\ub2f9 \ud55c\uc9c4\ud0c0\uc6b4)"
  },
  {
    "id": 340,
    "name": "\uc625\uc218\uadf9\ub3d9\uc544\ud30c\ud2b8 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.54291834607278,
    "lng": 127.01229152745834,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \ub3c5\uc11c\ub2f9\ub85c 191 (\uc625\uc218\ub3d9, \uc625\uc218\ub3d9\uadf9\ub3d9\uc544\ud30c\ud2b8)"
  },
  {
    "id": 341,
    "name": "\uc625\uc218\uadf9\ub3d9\uadf8\ub9b0\uc544\ud30c\ud2b8 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.5417654292356,
    "lng": 127.01096779826084,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \ub3c5\uc11c\ub2f9\ub85c 175 (\uc625\uc218\ub3d9, \uadf9\ub3d9\uadf8\ub9b0\uc544\ud30c\ud2b8)"
  },
  {
    "id": 349,
    "name": "\uac15\ubcc0\uae08\ud638\ud0c0\uc6b4\uc544\ud30c\ud2b8",
    "type": "COLD",
    "lat": 37.53514984792098,
    "lng": 127.05768242853446,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \ub458\ub80819\uae38 7 (\uc131\uc218\ub3d92\uac00, \uac15\ubcc0\uae08\ud638\ud0c0\uc6b4\uc544\ud30c\ud2b8)"
  },
  {
    "id": 353,
    "name": "\uc11c\uc6b8\uc232\ub300\ub9bc\uc544\ud30c\ud2b8 \uc9c0\ud558 1\uce35",
    "type": "COLD",
    "lat": 37.54149863463248,
    "lng": 127.04568915401812,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \ub69d\uc12c\ub85c 311(\uc131\uc218\ub3d91\uac00, \uc11c\uc6b8\uc232 \ub300\ub9bc)"
  },
  {
    "id": 359,
    "name": "\uae08\ud6381\ucc28 \ud478\ub974\uc9c0\uc624\uc544\ud30c\ud2b8 \uc9c0\ud5581~3\uce35",
    "type": "COLD",
    "lat": 37.54911925444769,
    "lng": 127.01975737138794,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uae08\ud638\uc0b0\uae38 8 (\uae08\ud638\ub3d93\uac00, \uae08\ud6381\ucc28\ud478\ub974\uc9c0\uc624\uc544\ud30c\ud2b8)"
  },
  {
    "id": 364,
    "name": "\uc1a1\uc6d0\ucd08\ub4f1\ud559\uad50 \uc9c0\ud558\uc8fc\ucc28\uc7a5(\uc9c0\ud558 1\uce35)",
    "type": "COLD",
    "lat": 37.55414334086365,
    "lng": 127.06975759279987,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \ub3d9\uc77c\ub85c43\uae38 9 (\uc1a1\uc815\ub3d9, \uc1a1\uc6d0\ucd08\ub4f1\ud559\uad50)"
  },
  {
    "id": 365,
    "name": "\ud55c\uc591\ub300\ud559\uad50 \ud55c\uc591\uc885\ud569\uae30\uc220\uc5f0\uad6c\uc6d0 \uc9c0\ud558 1\uce35",
    "type": "COLD",
    "lat": 37.55741250387464,
    "lng": 127.04291313584469,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uc655\uc2ed\ub9ac\ub85c 222 (\uc0ac\uadfc\ub3d9, \ud55c\uc591\ub300\ud559\uad50)"
  },
  {
    "id": 369,
    "name": "\ub178\ube14\ub9ac\uc548 \uc9c0\ud558\uc8fc\ucc28\uc7a5 1~2\uce35",
    "type": "COLD",
    "lat": 37.5651610045434,
    "lng": 127.0271239298928,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uc655\uc2ed\ub9ac\ub85c 390 (\uc0c1\uc655\uc2ed\ub9ac\ub3d9, \ub178\ube14\ub9ac\uc548)"
  },
  {
    "id": 376,
    "name": "\uc131\uc218\ub86f\ub370\uce90\uc2ac\ud30c\ud06c (\uc9c0\ud558 1~2\uce35)",
    "type": "COLD",
    "lat": 37.54539766679746,
    "lng": 127.055689834142,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uc131\uc218\uc77c\ub85c8\uae38 47(\uc131\uc218\ub3d92\uac00, \uc131\uc218\ub3d9 \ub86f\ub370\uce90\uc2ac\ud30c\ud06c)"
  },
  {
    "id": 383,
    "name": "\uc11c\uc6b8\uc232\ud55c\uc2e0\ub354\ud734\uc544\ud30c\ud2b8 \uc804\uccb4 \ub3d9\uc758 \uc9c0\ud558\uc8fc\ucc28\uc7a5 2~4\uce35",
    "type": "COLD",
    "lat": 37.55491588255803,
    "lng": 127.03500740037248,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uace0\uc0b0\uc790\ub85c 164 (\ud589\ub2f9\ub3d9, \uc11c\uc6b8\uc232\ud55c\uc2e0\ub354\ud734)"
  },
  {
    "id": 387,
    "name": "FORHU \uc9c0\ud558 1~5\uce35",
    "type": "COLD",
    "lat": 37.542737029016585,
    "lng": 127.044712422825,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uc655\uc2ed\ub9ac\ub85c 58, FORHU (\uc131\uc218\ub3d91\uac00)"
  },
  {
    "id": 388,
    "name": "\ud589\ub2f9\ube0c\ub77c\uc6b4\uc2a4\ud1a4(\uc9c0\ud5581\uce35 \uc8fc\ucc28\uc7a5)",
    "type": "COLD",
    "lat": 37.55833666299692,
    "lng": 127.02964380755807,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \ud589\ub2f9\ub85c 99 (\ud589\ub2f9\ub3d9, \ud589\ub2f9\ube0c\ub77c\uc6b4\uc2a4\ud1a4)"
  },
  {
    "id": 391,
    "name": "\ud558\uc655\uadf9\ub3d9\ubbf8\ub77c\uc8fc\uc544\ud30c\ud2b8 \uc9c0\ud5581\uce35~2\uce35",
    "type": "COLD",
    "lat": 37.558658708566746,
    "lng": 127.02355753753616,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \ub09c\uacc4\ub85c 73 (\ud558\uc655\uc2ed\ub9ac\ub3d9, \uadf9\ub3d9\ubbf8\ub77c\uc8fc \uc544\ud30c\ud2b8)"
  },
  {
    "id": 394,
    "name": "\uc131\uc218SKV1 \uc9c0\uc2dd\uc0b0\uc5c5\uc13c\ud130(\uc9c0\ud5581\uce35~ 5\uce35)",
    "type": "COLD",
    "lat": 37.543401614390426,
    "lng": 127.05565484334257,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uc5f0\ubb34\uc7a55\uac00\uae38 25, \uc131\uc218\uc5ed SK V1 Tower (\uc131\uc218\ub3d92\uac00)"
  },
  {
    "id": 400,
    "name": "\ud55c\uc591\ub300\ud559\uad50 \ud55c\uc591\uc885\ud569\uae30\uc220\uc5f0\uad6c\uc6d0 \uc8fc\ucc28\uc7a5 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.55741250387464,
    "lng": 127.04291313584469,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uc655\uc2ed\ub9ac\ub85c 222, \ud55c\uc591\ub300\ud559\uad50 (\uc0ac\uadfc\ub3d9)"
  },
  {
    "id": 401,
    "name": "\ud55c\uc591\ub300\ud559\uad50 \ud55c\uc591\uc885\ud569\uae30\uc220\uc5f0\uad6c\uc6d0 \uc8fc\ucc28\uc7a5 \uc9c0\ud558 2\uce35",
    "type": "COLD",
    "lat": 37.55741250387464,
    "lng": 127.04291313584469,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uc655\uc2ed\ub9ac\ub85c 222, \ud55c\uc591\ub300\ud559\uad50 (\uc0ac\uadfc\ub3d9)"
  },
  {
    "id": 403,
    "name": "\uc9c0\uc6f0\ud648\uc2a4 \uc655\uc2ed\ub9ac \uc9c0\ud558\uc8fc\ucc28\uc7a5 1~2\uce35",
    "type": "COLD",
    "lat": 37.56315771463208,
    "lng": 127.03747210587106,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uace0\uc0b0\uc790\ub85c14\uae38 26 (\ud589\ub2f9\ub3d9, \uc9c0\uc6f0\ud648\uc2a4 \uc655\uc2ed\ub9ac)"
  },
  {
    "id": 404,
    "name": "\uc11c\uc6b8\uc232 \ud55c\ub77c\uc2dc\uadf8\ub9c8\ubc38\ub9ac(\uc9c0\ud5581~5\uce35)",
    "type": "COLD",
    "lat": 37.53990130475956,
    "lng": 127.05504669162892,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uc131\uc218\uc774\ub85c 51, \uc11c\uc6b8\uc232\ud55c\ub77c\uc2dc\uadf8\ub9c8\ubca8\ub9ac (\uc131\uc218\ub3d92\uac00)"
  },
  {
    "id": 408,
    "name": "\ud604\ub300\ud14c\ub77c\uc2a4\ud0c0\uc6cc \uc9c0\uc2dd\uc0b0\uc5c5\uc13c\ud130 \uc9c0\ud558 1~4\uce35",
    "type": "COLD",
    "lat": 37.5440863066041,
    "lng": 127.053671510018,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uc5f0\ubb34\uc7a55\uac00\uae38 7, \uc131\uc218\uc5ed \ud604\ub300\ud14c\ub77c\uc2a4\ud0c0\uc6cc (\uc131\uc218\ub3d92\uac00)"
  },
  {
    "id": 417,
    "name": "\uc11c\uc6b8\uc232SK V1\ud0c0\uc6cc \uc9c0\ud558 1~4\uce35",
    "type": "COLD",
    "lat": 37.5467558710507,
    "lng": 127.051261068698,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uc131\ub3d9\uad6c \uc131\uc218\uc77c\ub85c8\uae38 5, \uc11c\uc6b8\uc232 SK V1 TOWER (\uc131\uc218\ub3d92\uac00)"
  },
  {
    "id": 429,
    "name": "\uad11\uc9c4\uacbd\ucc30\uc11c \uc8fc\ucc28\uc7a5 \uc9c0\ud558 1\uce35~3\uce35",
    "type": "COLD",
    "lat": 37.54267168108089,
    "lng": 127.084058401391,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uad11\uc9c4\uad6c \uc790\uc591\ub85c 167 (\uad6c\uc758\ub3d9, \uad11\uc9c4\uacbd\ucc30\uc11c)"
  },
  {
    "id": 431,
    "name": "\ub300\uc21c\uc9c4\ub9ac\ud68c \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.56027679010968,
    "lng": 127.08772617611858,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uad11\uc9c4\uad6c \uc6a9\ub9c8\uc0b0\ub85c 74 (\uc911\uace1\ub3d9, \ub300\uc21c\uc885\ub2e8\ucc9c\uc548\ubc29\uba74\uc911\uc559\uc5f0\ub77d\uc18c)"
  },
  {
    "id": 445,
    "name": "JS\ube4c\ub529 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.555320287915855,
    "lng": 127.08497416161492,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uad11\uc9c4\uad6c \ucc9c\ud638\ub300\ub85c 605 (\uc911\uace1\ub3d9, JS\ube4c\ub529)"
  },
  {
    "id": 451,
    "name": "\ud55c\uac15\uc6b0\uc131\uc544\ud30c\ud2b8 \uc9c0\ud558\uc8fc\ucc28\uc7a5 1\uce35",
    "type": "COLD",
    "lat": 37.532689931835,
    "lng": 127.06618334788854,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uad11\uc9c4\uad6c \ub2a5\ub3d9\ub85c1\uae38 15 (\uc790\uc591\ub3d9, \ud55c\uac15\uc6b0\uc131\uc544\ud30c\ud2b8)"
  },
  {
    "id": 453,
    "name": "\uc0bc\ubbfc\uc544\ud30c\ud2b8 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.56331303111137,
    "lng": 127.0837887101534,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uad11\uc9c4\uad6c \uae34\uace0\ub791\ub85c15\uae38 32 (\uc911\uace1\ub3d9, \uc0bc\ubbfc\uc544\ud30c\ud2b8)"
  },
  {
    "id": 467,
    "name": "\uc790\uc591\uc6b0\uc1317\ucc28\uc544\ud30c\ud2b8 \uc9c0\ud558\uc8fc\ucc28\uc7a5 1~2\uce35",
    "type": "COLD",
    "lat": 37.536909679677095,
    "lng": 127.07394689673802,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uad11\uc9c4\uad6c \uc544\ucc28\uc0b0\ub85c36\uae38 39, \uc9c0\ud558\uc8fc\ucc28\uc7a5 1\uce35 (\uc790\uc591\ub3d9, \uc790\uc5917\ucc28\uc6b0\uc131\uc544\ud30c\ud2b8)"
  },
  {
    "id": 469,
    "name": "\uac74\ub300\uc785\uad6c\uc5ed 7\ud638\uc120 \uc9c0\ud5582\uce35",
    "type": "COLD",
    "lat": 37.54077772369288,
    "lng": 127.071111895324,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uad11\uc9c4\uad6c \ub2a5\ub3d9\ub85c \uc9c0\ud558 110 (\ud654\uc591\ub3d9, 7\ud638\uc120 \uac74\ub300\uc785\uad6c\uc5ed)"
  },
  {
    "id": 476,
    "name": "\uc911\uace11\ub3d9 \uc8fc\ubbfc\uc13c\ud130 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.560610822520175,
    "lng": 127.07987881448696,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uad11\uc9c4\uad6c \uae34\uace0\ub791\ub85c12\uae38 49 (\uc911\uace1\ub3d9, \uc911\uace1\uc81c1\ub3d9\uc8fc\ubbfc\uc13c\ud130)"
  },
  {
    "id": 478,
    "name": "\uc911\uace13\ub3d9 \uc8fc\ubbfc\uc13c\ud130 \uc9c0\ud5581\uce35",
    "type": "COLD",
    "lat": 37.56879168739154,
    "lng": 127.08008762117544,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uad11\uc9c4\uad6c \ub3d9\uc77c\ub85c76\uac00\uae38 28 (\uc911\uace1\ub3d9, \uc911\uace1\uc81c3\ub3d9\uc8fc\ubbfc\uc13c\ud130)"
  },
  {
    "id": 480,
    "name": "\ub2a5\ub3d9 \uc8fc\ubbfc\uc13c\ud130 \uc9c0\ud558 1\uce35",
    "type": "COLD",
    "lat": 37.55384169245865,
    "lng": 127.08043797282164,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uad11\uc9c4\uad6c \ucc9c\ud638\ub300\ub85c112\uae38 55, \ub2a5\ub3d9\uc8fc\ubbfc\uc13c\ud130 (\ub2a5\ub3d9)"
  },
  {
    "id": 485,
    "name": "\uc790\uc5915\ucc28\ud604\ub300\uc544\ud30c\ud2b8 \uc9c0\ud558\uc8fc\ucc28\uc7a5 \uc9c0\ud558 1~3\uce35",
    "type": "COLD",
    "lat": 37.52842931092808,
    "lng": 127.0794393592674,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uad11\uc9c4\uad6c \ub69d\uc12c\ub85c54\uae38 74 (\uc790\uc591\ub3d9, \uc790\uc5915\ucc28\ud604\ub300\uc544\ud30c\ud2b8)"
  },
  {
    "id": 501,
    "name": "\uad6c\uc7582\ub3d9 \ubcf5\ud569\uccad\uc0ac \uc9c0\ud558\uc8fc\ucc28\uc7a5 \uc9c0\ud5581~3\uce35",
    "type": "COLD",
    "lat": 37.5471482251626,
    "lng": 127.089957159608,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uad11\uc9c4\uad6c \ucc9c\ud638\ub300\ub85c136\uae38 55, \uad6c\uc7582\ub3d9 \ubcf5\ud569\uccad\uc0ac (\uad6c\uc758\ub3d9)"
  },
  {
    "id": 508,
    "name": "\ud718\uacbd\ubbf8\uc18c\uc9c0\uc6c0\uc544\ud30c\ud2b8 \uc9c0\ud558\uc8fc\ucc28\uc7a5 \uc9c0\ud558 1\uce35",
    "type": "COLD",
    "lat": 37.5910487923103,
    "lng": 127.06484442199223,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \ub3d9\ub300\ubb38\uad6c \ub9dd\uc6b0\ub85c 105 (\ud718\uacbd\ub3d9, \ud718\uacbd\ubbf8\uc18c\uc9c0\uc6c0\uc544\ud30c\ud2b8)"
  },
  {
    "id": 511,
    "name": "\ub2f5\uc2ed\ub9ac \uccad\uc194\uc6b0\uc131\uc544\ud30c\ud2b8 \uc9c0\ud558\uc8fc\ucc28\uc7a5 \uc9c0\ud558 1,2\uce35",
    "type": "COLD",
    "lat": 37.57490797933808,
    "lng": 127.05873452420428,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \ub3d9\ub300\ubb38\uad6c \uc804\ub18d\ub85c10\uae38 20 (\ub2f5\uc2ed\ub9ac\ub3d9, \ub2f5\uc2ed\ub9ac\uccad\uc194\uc6b0\uc131\uc544\ud30c\ud2b8)"
  },
  {
    "id": 525,
    "name": "1\ud638\uc120 \uc81c\uae30\ub3d9\uc5ed \uc9c0\ud558 1\uce35, 2\uce35",
    "type": "COLD",
    "lat": 37.578265579329695,
    "lng": 127.0336911596097,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \ub3d9\ub300\ubb38\uad6c \uc655\uc0b0\ub85c \uc9c0\ud558 93 (\uc81c\uae30\ub3d9, \uc81c\uae30\ub3d9\uc5ed)"
  },
  {
    "id": 531,
    "name": "\uc774\ubb38\ud604\ub300\uc544\ud30c\ud2b8 \uc9c0\ud558\uc8fc\ucc28\uc7a5 \uc9c0\ud558 1,2\uce35",
    "type": "COLD",
    "lat": 37.601339712329874,
    "lng": 127.07080257949292,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \ub3d9\ub300\ubb38\uad6c \ud55c\ucc9c\ub85c58\uae38 107 (\uc774\ubb38\ub3d9, \ud604\ub300\uc544\ud30c\ud2b8)"
  },
  {
    "id": 535,
    "name": "\uc7a5\uc548\ud604\ub300\ud648\ud0c0\uc6b4 \uc9c0\ud558\uc8fc\ucc28\uc7a5 \uc9c0\ud5581,2\uce35",
    "type": "COLD",
    "lat": 37.56972668029375,
    "lng": 127.07574226891909,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \ub3d9\ub300\ubb38\uad6c \uc7a5\uc548\ubc9a\uaf43\ub85c 107 (\uc7a5\uc548\ub3d9)"
  },
  {
    "id": 542,
    "name": "\ub2f5\uc2ed\ub9ac \ub450\uc0b0\uc784\ub300\uc544\ud30c\ud2b8 \uc9c0\ud558\uc8fc\ucc28\uc7a5 1\uce35",
    "type": "COLD",
    "lat": 37.57020176519005,
    "lng": 127.05938074911624,
    "addr": "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \ub3d9\ub300\ubb38\uad6c \ub2f5\uc2ed\ub9ac\ub85c56\uae38 21-1 (\ub2f5\uc2ed\ub9ac\ub3d9, \ub450\uc0b0\uc544\ud30c\ud2b8)"
  }
];
export default DUMMY_COLD_SHELTERS;