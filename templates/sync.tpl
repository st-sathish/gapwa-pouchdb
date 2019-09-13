<% for(i = 0;i < this.data.length;i++) { %>
<div class="row" style="padding-top:20px">
      <div class="column" style="background-color:#aaa;">
        <h2><%= this.data[i].display_name %>&nbsp;<i class="fas fa-arrow-up"></i></h2>
        <p>Some text..</p>
      </div>
      <div class="column" style="background-color:#bbb;">
        <h2><%= this.data[i].display_name %>&nbsp;<i class="fas fa-arrow-down"></i></h2>
        <p>Some text..</p>
      </div>
</div>
<% } %>