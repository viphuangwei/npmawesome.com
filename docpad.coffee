CONTRIBUTORS =
  alexgorbatchev:
    name: 'Alex Gorbatchev'
    github: 'alexgorbatchev'

docpadConfig =
  env: 'static'

  templateData:
    site:
      title: 'npm awesome'
      author: 'Alex Gorbatchev'
      description: 'Daily dose of awesome NPM modules for Node.js, old and new!'
      url: 'http://npmawesome.com'

    fullUrl: (doc = @document) ->
      @site.url + doc.url

    preparedTitle: (doc = @document)->
      doc.title or doc.npm?.name

    preparedSlug: (doc = @document)->
      doc.npm?.name

    githubUrl: ->
      "https://github.com/#{@document.npm.repo}"

    npm: ->
      """<a href="#{@githubUrl()}">#{@document.npm.name}</a>"""

    author: (doc = @document) ->
      slug = doc.author or 'alexgorbatchev'
      author = CONTRIBUTORS[slug]

      throw "Unknown author `#{slug}`" unless author?
      "<a href=\"https://github.com/#{author.github}\">#{author.name}</a>"

    pageTitle: ->
      title = @preparedTitle()
      title = "#{title} | " if title?
      (title or '') + @site.title

  events:
    parseAfter: ({collection}, done) ->
      # @docpad.collections.posts.forEach (post) ->
      done()

    writeAfter: (opts, next) ->
      # Prepare
      {rootPath, outPath} = @docpad.getConfig()

      # Bundle the scripts the editor uses together
      command = """
        cd #{rootPath} &&
        #{rootPath}/node_modules/.bin/browserify #{outPath}/scripts/npmawesome.js
        | #{rootPath}/node_modules/.bin/uglifyjs > #{outPath}/scripts/npmawesome.bundle.js
      """.replace(/\n/g,' ')

      # Execute
      shelljs = require 'shelljs'

      shelljs.exec command, next
      # safeps.exec "find ./out/scripts | grep -v 'npmawesome.bundle.js' | xargs rm", {cwd:rootPath}, ->

      # Chain
      @

  collections:
    posts: (database) ->
      database.findAllLive {relativeOutDirPath: /^posts/, isPagedAuto: $ne: true}, [date: -1, basename: -1]

  plugins:
    rss:
      collection: 'posts'
      url: '/rss'

# Export the DocPad Configuration
module.exports = docpadConfig
