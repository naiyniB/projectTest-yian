import { Octokit } from "octokit";

let octokitInstance = null;

function getOctokit(GITHUB_TOKEN) {
  if (!octokitInstance) {
    octokitInstance = new Octokit({
      auth: GITHUB_TOKEN,
    });
  }
  return octokitInstance;
}

export const githubOctokit = (GITHUB_TOKEN) => {
  return {
    uploadFile: async (Base64OfFile, owner, repo, path) => {
      let existingSha = null;
      octokitInstance = getOctokit(GITHUB_TOKEN);
      try {
        const { data: fileData } = await octokitInstance.rest.repos.getContent({
          owner,
          repo,
          path,
        });
        existingSha = fileData.sha;
        console.log('✅ 文件已存在，SHA:', existingSha);
      } catch (error) {
        if (error.status === 404) {
          console.log('🆕 文件不存在，将创建新文件');
        } else {
          console.warn('⚠️ 检查文件状态时出错:', error.message);
        }
      }
      try {
        const response = await octokitInstance.request('PUT /repos/{owner}/{repo}/contents/{path}', {
          owner,
          repo,
          path,
          message: 'Upload file via API',
          content: Base64OfFile,
        });

        console.log('🎉 成功上传并提交！');
        console.log('📌 Commit URL:', response.data.commit.html_url);
        console.log('📄 文件 URL:', response.data.content.html_url);

        return response.data; // 可选：返回数据供调用者使用
      } catch (error) {
        console.error('❌ 失败:', error.status, error.message);
        throw error; // 重新抛出错误，让调用者可以处理
      }
    }
  };
};