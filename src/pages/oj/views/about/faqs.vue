<template>
  <div>
    <el-card class="faq-card">
      <div slot="header">
        <span style="font-size: 18px; font-weight: 600; color: rgb(73, 80, 96);">Compile Options</span>
      </div>
      <div class="content">
        <ul>
          <li>C(GCC 5.4.0)
            <pre>gcc -g -O2 -std=gnu11 -static ${files} -lm</pre>
          </li>
          <li>C++(G++ 5.4.0)
            <pre>g++ -g -O2 -std=gnu++14 -static ${files}</pre>
          </li>
          <li>Java(OpenJDK version 1.8.0_131)
            <pre>javac -encoding UTF-8 -sourcepath . -d . ${files}</pre>
          </li>
        </ul>
      </div>
    </el-card>
    <el-card class="faq-card">
      <div slot="header">
        <span style="font-size: 18px; font-weight: 600; color: rgb(73, 80, 96);">Frequently Asked Questions</span>
      </div>
      <div class="content">
        <ul>
          <li>What does my program input from and output to?
            <p>Your program shall always input from <code>stdin</code> (Standard Input) and output to <code>stdout</code> (Standard Output). For example, you use <code>scanf</code> in C or <code>cin</code> in C++ to read from stdin, and <code>printf</code> in C or <code>cout</code> in C++ to write to stdout. User programs are not allowed to open and read from/write to files. You will probably get a <code>Runtime Error</code> or <code>Wrong Answer</code> if you try to do so.</p>
          </li>
          <li>What's the meaning of the submission execution time?
            <p>The onlinejudge might test your code multiple times with different input files. If your code gives the correct answer within the time limit for each input file, the execution time displayed is the max of the time spent for each test case. Otherwise, the execution time will have no sense.</p>
          </li>
          <li>How can I use C++ Int64?
            <p>You should declare as <code>long long</code> and use with <code>cin/cout</code> or <code>%lld</code>, using <code>__int64</code> will result in <code>Compile Error</code> or <code>Wrong Answer</code>.</p>
          </li>
          <li>How to submit Java programs?
            <p>Java programs submitted must be in a single source code (not .class) file.  They must also read from standard input and write to standard output, as in the other languages. All programs must begin in a static method named <code>main</code> in a class named <code>Main</code>. However, you can implement and instance as many classes as needed.</p>
          </li>
        </ul>
      </div>
    </el-card>
    <el-card class="faq-card">
      <div slot="header">
        <span style="font-size: 18px; font-weight: 600; color: rgb(73, 80, 96);">Judge's Replies</span>
      </div>
      <div class="content">
        <ul>
          <li>Pending & Judging
            <p>You solution will be judged soon, please wait for result.</p>
          </li>
          <li>Accepted(AC):
            <p>Congratulations! Your program is correct!</p>
          </li>
          <li>Presentation Error(PE)
            <p>Your output format is not exactly the same as the judge's output, although your answer to the problem is correct. Check your output for spaces, blank lines, etc. against the problem output specification.</p>
          </li>
          <li>Wrong Answer(WA)
            <p>Expected output not reached for the input. The input and output data that we use to test the programs are not public (it is recommendable to get accustomed to a true contest dynamic).</p>
          </li>
          <li>Runtime Error(RE)
            <p>Your program failed during the execution (illegal file access, stack overflow, pointer reference out of range, floating point exception, division by zero...).</p>
          </li>
          <li>Time Limit Exceeded(TLE)
            <p>Your program tried to run for too much time.</p>
          </li>
          <li>Memory Limit Exceeded (MLE)
            <p>Your program tried to use more memory than the judge default settings.</p>
          </li>
          <li>Output Limit Exceeded (OLE)
            <p>Your program tried to output too much. This usually occurs when your program goes into an infinite loop. Currently the output limit is twice the standard output file’s size ,default as 1MB.</p>
          </li>
          <li>Compile Error(CE)
            <p>The compiler could not compile your program. Warning messages are not considered errors. Click on the link at the judge's reply to see the actual error messages.</p>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  .faq-card {
    margin: 20px 2%;
    span {
      font-size: 20px;
      color: rgb(51, 51, 51);
    }
    .content {
      margin: 20px;
      > ul {
        list-style: disc;
        li {
          margin-top: 20px;
          font-size: 14px;
          &:first-child {
            margin-top: 0px;
          }
          p {
            margin-top: 5px;
          }
          pre {
            padding: 4px;
            background-color: rgb(248, 248, 249);
            color: rgb(73, 80, 96);
            border: 1px dashed rgb(233, 234, 236);
          }
          code {
            padding: 2px 5px;
            font-size: 90%;
            color: rgb(73, 80, 96);
            background-color: rgba(27, 31, 35, 0.05);
            border-radius: 4px;
            font-family: Consolas,Menlo,Courier,monospace;
          }
        }
      }
    }
  }
</style>
