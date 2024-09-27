import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
const output = await replicate.run(
  "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4",
  {
    input: {
      crop: false,
      seed: 42,
      steps: 30,
      category: "upper_body",
      force_dc: false,
      garm_img: "https://replicate.delivery/pbxt/KgwTlZyFx5aUU3gc5gMiKuD5nNPTgliMlLUWx160G4z99YjO/sweater.webp",
      mask_img: "https://replicate.delivery/pbxt/KnaDKqnN0h1DDF5CnK7iRSSkFnJrk9kyRiQlcc5gBcy8gpPA/replicate-prediction-wfj8g6sgmxrgp0cf1gnv7btfh8.jpg",
      human_img: "https://replicate.delivery/pbxt/KgwTlhCMvDagRrcVzZJbuozNJ8esPqiNAIJS3eMgHrYuHmW4/KakaoTalk_Photo_2024-04-04-21-44-45.png",
      garment_des: "cute pink top"
    }
  }
);
console.log(output);

