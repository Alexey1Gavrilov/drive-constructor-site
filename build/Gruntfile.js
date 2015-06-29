module.exports = function(grunt) {
	var DIR_ICONS = "/Users/agavrilov/Google Drive/Drive Constructor/Outlook & icons & diagrams/Icons/Final"
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['target'],

    grunticon: {
      icons: {
        files: [{
          expand: true,
          cwd: DIR_ICONS,
         	src: ['**/*.svg'],
          dest: 'target/icons'
        }],
      }
    },

    copy: {
      icons: {
        expand: true,
        cwd: 'target/icons',
        src: ['**/*.css', 'png/**'],
        dest: '../icons'
      }
    }
  });

  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('icons', [
    'grunticon', 'copy'
  ]);
};
