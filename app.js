async function findUser() {
      const id = document.getElementById("userId").value;
      const output = document.getElementById("output");
      output.innerHTML = "<p class='loading'>⏳ Loading...</p>";

      try {
        const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!userRes.ok) throw new Error("User not found!");
        const user = await userRes.json();

        const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
        const posts = await postsRes.json();

        let result = `
          <h3>${user.name} (@${user.username})</h3>
          <p>Email: <a href="mailto:${user.email}">${user.email}</a></p>
          <p>Website: <a href="http://${user.website}" target="_blank">${user.website}</a></p>
          <h4>Posts:</h4>
        `;

        posts.forEach(post => {
          result += `
            <div>
              <p class="post-title">${post.title}</p>
              <p>${post.body}</p>
              <hr>
            </div>
          `;
        });

        output.innerHTML = result;
      } catch (e) {
        output.innerHTML = `<p style="color: red;">❌ ${e.message}</p>`;
      }
    }