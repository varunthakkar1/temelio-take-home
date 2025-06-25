
import { getApiDocs } from './swagger/functions';
import Swagger from './Swagger';

export default async function Page() {
  const spec = await getApiDocs();
  console.log(spec)

  return <Swagger spec={spec}/>;
}