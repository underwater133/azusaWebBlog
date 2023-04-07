import axios from 'axios'

let access_token = "121.d72fd270c17d5845f93d2694dff02463.YHyps5Y9tvw-UE6jp8SqnN8XxjjW6CycZjeqb9T.usX1Xw"

export const getPV = () => {
  return axios.get(`https://openapi.baidu.com/rest/2.0/tongji/report/getData?access_token=${access_token}&site_id=18957957&start_date=20230404&end_date=20330405&metrics=pv_count&method=visit/toppage/a`)
}