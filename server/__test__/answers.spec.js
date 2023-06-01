/* eslint-env jest */

const request = require('supertest');

describe('Answers API tests', () => {
  const agent = request('localhost:3000');

  it('Should respond with the proper data', async () => {
    const response = await agent.get('/qa/questions/1040/answers').expect(200);

    expect(JSON.parse(response.text).question).toBe('1040');
  });

  it('Should have a array of answer objects at the results property', async () => {
    const response = await agent.get('/qa/questions/1040/answers').expect(200);

    expect(typeof JSON.parse(response.text).results[0]).toBe('object');
  });

  it('Should have a array of answer objects at a questions answers property', async () => {
    const response = await agent.get('/qa/questions/1040/answers').expect(200);

    expect(typeof JSON.parse(response.text).results[0].answer_id).toBe('number');
  });

  it('Should update a answers helpfulness', async () => {
    const response = await agent.get('/qa/questions/1040/answers').expect(200);

    const tempId = JSON.parse(response.text).results[0].answer_id;
    const tempHelpfulness = JSON.parse(response.text).results[0].helpfulness;
    await agent.put(`/qa/answers/${tempId}/helpful`).expect(204);

    const response2 = await agent.get('/qa/questions/1040/answers').expect(200);
    expect(JSON.parse(response2.text).results[0].helpfulness).toBe(tempHelpfulness + 1);
  });
});
