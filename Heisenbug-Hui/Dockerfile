# Dockerfile用于生成应用镜像，非特殊情况请勿修改
FROM registry.hundsun.com/hcs/nginx-sshd:1.17.9-8.3p1-alpine

COPY dist /usr/share/nginx/html/Heisenbug-Hui

# 计算目录md5sum，并写入文件 /md5sum_for_copy/md5sum_for_copy_data.txt
# 如果多个目录，可以计算总的md5sum，如 tar cP /usr/share/nginx/html/frame-hui /dir2 | md5sum | awk '{print $1}' > /md5sum_for_copy/md5sum_for_copy_data.txt
# 如果是文件，计算md5sum直接 md5sum file1 | awk '{print $1}' > /md5sum_for_copy/md5sum_for_copy_data.txt
RUN mkdir -p /md5sum_for_copy && \
  tar cP /usr/share/nginx/html/Heisenbug-Hui | md5sum | awk '{print $1}' > /md5sum_for_copy/md5sum_for_copy_data.txt

WORKDIR /usr/share/nginx/html
