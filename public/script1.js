document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById('search-button');

  searchButton.addEventListener('click', function () {
    const searchType = document.getElementById('search-type').value;
    const searchWord = document.getElementById('search-input').value;

    // URL 인코딩을 사용하여 쿼리 스트링을 생성
    const query = `type=${encodeURIComponent(searchType)}&searchword=${encodeURIComponent(searchWord)}`;

    // app.js로 리다이렉트
    window.location.href = `/search?${query}`;
  });
});

